#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <map>
#include <vector>
#include <string>

#include <sstream>
#include <locale>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>
#include<iostream>
#include<fstream>
#include <msql.h>

typedef websocketpp::server<websocketpp::config::asio> server;

using websocketpp::connection_hdl;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;

using namespace std;

    struct coonntent_dat{
        string name;
        string secrid;
    };



    class broadcast_server {

    public:
        broadcast_server() {
            string ansver;
            for(int i=0;i<5;i++)
                 ansver+=(char)(48+rand()%74);
            date_file.open("datefile-"+ansver);
            m_server.init_asio();

            m_server.set_open_handler(bind(&broadcast_server::on_open,this,::_1));
            m_server.set_close_handler(bind(&broadcast_server::on_close,this,::_1));
            m_server.set_message_handler(bind(&broadcast_server::on_message,this,::_1,::_2));
        }



        void on_open(connection_hdl hdl) {
            N++;
            date_file <<"open connect "<< hdl.lock().get() << " number connect  "<< N << endl;
            coonntent_dat d ;
            m_connections[hdl]=d;

        }

        void on_close(connection_hdl hdl) {

             date_file <<"close connect "<< hdl.lock().get() << " number connect  "<< N << endl;
             N--;
             string name =m_connections[hdl].name;
            link_db->querys("DELETE FROM user_online WHERE name=\""+filtr( m_connections[hdl].name)+"\"");
            m_connections.erase(hdl);
            if(name!=""){
            std::map<connection_hdl,coonntent_dat,std::owner_less<connection_hdl>>::iterator it = m_connections.begin();
               while(it!=m_connections.end()) {
               m_server.send(it->first,"{\"name\":\""+name+"\"}",websocketpp::frame::opcode::text);
               it++;
               }
            }

        }

        void on_message(connection_hdl hdl, server::message_ptr msg) {
        using boost::property_tree::ptree;

           date_file << "on_message called with hdl: " << hdl.lock().get()
                      << " and message: " << msg->get_payload()
                      << std::endl;

                try{
                ptree pt;

                string s= msg->get_payload();
                std::stringstream ss;
                ss << s;
                read_json(ss,pt);



                if((pt.count("password")==1)&&(pt.count("name")==1))
                        {
                    string name =pt.get<std::string>("name");
                    string password =pt.get<std::string>("password");
                         std::vector<string> table;
                            table.push_back(string("user"));
                            string f[]={"name","key_h","salt"};
                            std::vector<string> fields(f,f+3);
                          string additional="WHERE name='"+filtr(name)+"'";
                            std::vector<std::map<string,string>> q= link_db->q_select(table,fields,additional);
                            if((q.size()>0)&&(q[0].count("error")>0)&&(q[0]["error"]=="MySQL server has gone away"))
                            {
                                link_db->rebbot();
                                q= link_db->q_select(table,fields,additional);
                            }
                            if(q.size()==1)
                            {
                                std::map<string,string> ma =q[0];

                                string klo =websocketpp::md5::md5_hash_hex(ma["key_h"]+m_connections[hdl].secrid);
                                if(klo==password)
                                    {
                                    string ansver;
                                    for(int i=0;i<50;i++)
                                         ansver+=(char)(48+rand()%74);

                                    m_connections[hdl].name=name;
                                    m_server.send(hdl,"{\"result\":\"true\",\"name\":\""+name+"\",\"password\":\""+filtr(ansver)+"\"}",websocketpp::frame::opcode::text);
                                    link_db->querys("DELETE FROM user_online WHERE name=\""+filtr( name)+"\"");
                                    link_db->querys("INSERT INTO user_online(name,password) VALUES (\""+filtr(name)+"\",\""+filtr(ansver)+"\")");
                                   std::map<connection_hdl,coonntent_dat,std::owner_less<connection_hdl>>::iterator it = m_connections.begin();
                                      while(it!=m_connections.end()) {
                                          m_server.send(it->first,"{\"name\":\""+name+"\"}",websocketpp::frame::opcode::text);
                                      it++;
                                      }

                                      }
                                        else
                                     {
                                        m_server.close(hdl,websocketpp::close::status::normal,"");
                                     }
                                    }
                            }

                else if(pt.count("name")==1)
                        {
                    string name =pt.get<std::string>("name");

                                string ansver;
                                for(int i=0;i<10;i++)
                                     ansver+=(char)(48+rand()%74);

                                m_connections[hdl].secrid=ansver;

                                std::vector<string> table;
                                table.push_back(string("user"));
                                string f[]={"name","key_h","salt"};
                                std::vector<string> fields(f,f+3);

                                string additional="WHERE name='"+filtr(name)+"'";
                                std::vector<std::map<string,string>> q= link_db->q_select(table,fields,additional);
                                if((q.size()>0)&&(q[0].count("error")>0)&&(q[0]["error"]=="MySQL server has gone away"))
                                {
                                    link_db->rebbot();
                                    q= link_db->q_select(table,fields,additional);
                                }
                                if(q.size()==1)
                                {
                                       std::map<string,string> ma =q[0];
                                     m_server.send(hdl,"{\"salte\":\""+ma["salt"]+"\",\"key\":\""+ansver+"\"}",websocketpp::frame::opcode::text);
                              }
                                else
                                {
                                    m_server.close(hdl,websocketpp::close::status::normal,"");
                                }




                        }
                else if(pt.count("fo_user")==1&&m_connections[hdl].name!="")
                {
                    string name=pt.get<std::string>("fo_user");
                    m_server.send( get_hdl(name),msg);
                }
                else if(pt.count("fo_all")==1&&m_connections[hdl].name!="")
                {
                    std::map<connection_hdl,coonntent_dat,std::owner_less<connection_hdl>>::iterator it = m_connections.begin();
                       while(it!=m_connections.end()) {
                           m_server.send(it->first,msg);
                       it++;
                       }
                }



            }catch(...)
            {
            }


        }

        void run(uint16_t port) {
            m_server.listen(port);
            m_server.start_accept();
            m_server.run();
        }

        void  connect_db(const string & host,const string & user,const string & password,const string & db){
            link_db = new msql(host,user,password,db);

     }

    private:

        typedef   std::map < connection_hdl,coonntent_dat,std::owner_less<connection_hdl>> con_list;

        connection_hdl get_hdl(string s)
        {


             std::map < connection_hdl,coonntent_dat,std::owner_less<connection_hdl>>::iterator iter;
             for(iter = m_connections.begin(); iter!=m_connections.end(); iter++ )
             {
                 coonntent_dat q =iter->second;
                if(iter->second.name==s)
                {
                    return iter->first;
                }
             }
             connection_hdl t;
             return t;
        }

        int N;
        ofstream date_file;
        msql* link_db;
        server m_server;
        con_list m_connections;


         string filtr(const string  & in) {
             string out=in;
       /*       out.replace(out.begin(),out.end(),"'","\'");
              out.replace(out.begin(),out.end(),"\x00","\\x00");
              out.replace(out.begin(),out.end(),"\n","\\n");
              out.replace(out.begin(),out.end(),"\r","\\r");
              out.replace(out.begin(),out.end(),"\\","\\\\");
              out.replace(out.begin(),out.end(),"\x1a","\\x1a");*/
              return out;
          }

};


    int main() {
        ifstream infile("date.conf");
        string pas;
        infile >> pas;
        broadcast_server server;
        server.connect_db("127.0.0.1","root",pas,"siter");
        server.run(9003);

    }
