#include <map>
#include <set>
#include <string>
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <locale>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

typedef websocketpp::server<websocketpp::config::asio> server;

using websocketpp::connection_hdl;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;
using namespace std;
 using boost::property_tree::ptree;




class coonntent_dat
{
public:
    string name;
    string password;
    set<connection_hdl,std::owner_less<connection_hdl>>lisen_i;
    set<connection_hdl,std::owner_less<connection_hdl>>lisen_me;
    coonntent_dat()
    {}

};


class con_list
{
public:

std::map<connection_hdl,coonntent_dat,std::owner_less<connection_hdl>> sets;

void erase(connection_hdl p1)
    {
    set<connection_hdl,std::owner_less<connection_hdl>>::iterator ite;
    set<connection_hdl,std::owner_less<connection_hdl>>lisen_i =  sets[p1].lisen_i;

    ite = lisen_i.begin();
    while(ite !=lisen_i.end())
            {

               sets[*ite].lisen_me.erase(p1);
               ite++;
            }




        sets.erase(p1);          //     ! тут исправь


    }
void insert(connection_hdl p1)
    {
    if(sets.count(p1)==0)
    {

        coonntent_dat t;
        sets[p1]= t ;

    }

    }
void listen(connection_hdl i,connection_hdl he)
    {
    if(sets.count(i)==1)
       {
        sets[i].lisen_i.insert(he);

       sets[he].lisen_me.insert(i);


        }
    }
connection_hdl get_hdl(string s)
{
     std::map<connection_hdl,coonntent_dat,std::owner_less<connection_hdl>>::iterator iter;
     for(iter = sets.begin(); iter!=sets.end(); iter++ )
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

};

class broadcast_server {
public:
    broadcast_server() {
        m_server.init_asio();

        m_server.set_open_handler(bind(&broadcast_server::on_open,this,::_1));
        m_server.set_close_handler(bind(&broadcast_server::on_close,this,::_1));
        m_server.set_message_handler(bind(&broadcast_server::on_message,this,::_1,::_2));
    }

    void on_open(connection_hdl hdl) {
        m_connections.insert(hdl);
        std::cout << "open connection: " << hdl.lock().get() << endl;
    }

    void on_close(connection_hdl hdl) {


        set<connection_hdl,std::owner_less<connection_hdl>>lisen_me =  m_connections.sets[hdl].lisen_me;


             set<connection_hdl,std::owner_less<connection_hdl>>::iterator ite = lisen_me.begin();
            while(ite !=lisen_me.end())
           {

                m_server.close(*ite,websocketpp::close::status::normal,"");

                  ite++;
             }

       m_connections.erase(hdl);
        std::cout << "close connection: " << hdl.lock().get()<< endl;
    }



    void on_message(connection_hdl hdl, server::message_ptr msg) {
        try{
            ptree pt;
            string s= msg->get_payload();
            std::stringstream ss;
            ss << s;
            read_json(ss,pt);

        std::cout << "on_message called with hdl: " << hdl.lock().get()
                  << " and message: " << msg->get_payload()
                  << std::endl;

        if(pt.count("type")!=0)
        {
            string sl=pt.get<std::string>("type");
            if(sl=="in")
            {
                connection_hdl p2 = m_connections.get_hdl(pt.get<std::string>("user"));
                if(m_connections.sets[p2].password==pt.get<std::string>("password"))
                m_connections.listen(hdl,p2);
            }
            if(sl=="out")
            {
                if(m_connections.sets[hdl].password==""&& m_connections.sets[hdl].name==""){
                    m_connections.sets[hdl].password=pt.get<std::string>("password");
                 m_connections.sets[hdl].name=pt.get<std::string>("user");}

                 for (auto it : m_connections.sets[hdl].lisen_me) {
                     m_server.send(it,msg);
                 }
                //работа  с БД
                //сделать потом
            }
            if(sl=="close")
            {
                for (auto it : m_connections.sets[hdl].lisen_me) {
                    m_server.send(it,msg);
                }
            }
        }
        else if (pt.count("date")!=0)
        {

            for (auto it : m_connections.sets[hdl].lisen_me) {
                m_server.send(it,msg);
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


    server m_server;
    con_list m_connections;
};

int main() {
    broadcast_server server;
    server.run(9002);
}
