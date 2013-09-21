#include <windows.h>
#include <iostream>
#include <fstream>

#define CONNECTOR_166PLUS // пример для версии библиотеки версии 1.66 (5.02) или выше


#define TACCESS_API  __declspec(dllimport)
typedef bool (WINAPI *tcallback)(BYTE* pData);
typedef BYTE* (WINAPI *typeSendCommand)(BYTE* pData);
typedef bool (WINAPI  *typeFreeMemory)(BYTE* pData);
typedef bool (WINAPI *typeSetCallback)(tcallback pCallback);

#ifdef CONNECTOR_166PLUS
	typedef BYTE* (WINAPI *typeInitialize)(const BYTE* dir, int level);
	typedef BYTE* (WINAPI *typeSetLogLevel)(int level);
	typedef BYTE* (WINAPI *typeUninitialize)();
#endif


std::ofstream xmlfile;
typeFreeMemory FreeMemory;


void UnloadLibrary( HMODULE hm )
{
	try {
		FreeLibrary(hm);
	}
	catch (...) {
		std::cout<<"Fail in FreeLibrary"<<std::endl;
	}
}

bool CALLBACK acceptor(BYTE *pData)
{
	xmlfile<<pData<<std::endl;
	FreeMemory(pData);
	return true;
}

int main(int argc, char* argv[]) {
	const unsigned buffSize = 256;
	char error[buffSize] = {0};

	int mainResult = 0;
	setlocale(LC_CTYPE, "");

	std::cout<<"Starting!"<<std::endl;
	xmlfile.open("test.xml");
	xmlfile<<"<?xml version='1.0' encoding='UTF-8'?>";
	xmlfile<<"<root>";

	HMODULE hm = LoadLibrary("txmlconnector.dll");
	if (hm) {
		try
		{
			// Получение адресов функций библиотеки
#ifdef CONNECTOR_166PLUS
			typeInitialize Initialize = 
				reinterpret_cast<typeInitialize>(GetProcAddress(hm, "Initialize"));
			if (!Initialize)	{
				sprintf_s(error, buffSize, "\"InitLog\" not found (0x%X)", GetLastError());
				throw std::runtime_error(error);
			}

			typeUninitialize UnInitialize = 
				reinterpret_cast<typeUninitialize>(GetProcAddress(hm, "UnInitialize"));
			if (!UnInitialize)	{
				sprintf_s(error, buffSize, "\"UnInitialize\" not found (0x%X)", GetLastError());
				throw std::runtime_error(error);
			}
	
			typeSetLogLevel SetLogLevel = 
				reinterpret_cast<typeSetLogLevel>(GetProcAddress(hm, "SetLogLevel"));
			if (!SetLogLevel)	{
				sprintf_s(error, buffSize, "\"SetLogLevel\" not found (0x%X)", GetLastError());
				throw std::runtime_error(error);
			}
#endif
	
			typeSetCallback SetCallback =
				reinterpret_cast<typeSetCallback>(GetProcAddress(hm, "SetCallback"));
			if (!SetCallback)	{
				sprintf_s(error, buffSize, "\"SetCallback\" not found (0x%X)", GetLastError());
				throw std::runtime_error(error);
			}
	
			typeSendCommand SendCommand =
				reinterpret_cast<typeSendCommand>(GetProcAddress(hm,"SendCommand"));
			if (!SendCommand)	{
				sprintf_s(error, buffSize, "\"SendCommand\" not found (0x%X)", GetLastError());
				throw std::runtime_error(error);
			}
	
			FreeMemory =
				reinterpret_cast<typeFreeMemory>(GetProcAddress(hm, "FreeMemory"));
			if (!FreeMemory)	{
				sprintf_s(error, buffSize, "\"FreeMemory\" not found (0x%X)", GetLastError());
				throw std::runtime_error(error);
			}

#ifdef CONNECTOR_166PLUS
			// Инициализация библиотеки
			int level = 3;
			std::cout<<"Initializing library: \".\\LOGS\"  level: "<< level <<std::endl;
			BYTE* res = Initialize(reinterpret_cast<const BYTE*>(".\\LOGS"), level);
	
			if (res) {
				sprintf_s(error, buffSize, "Failed to initialize library: %s", res);
				FreeMemory(res);
				throw std::runtime_error(error);
			} else {
				std::cout<<"Library initialized successfully!"<<std::endl;
			}
#endif
	
			SetCallback(acceptor);
	
			std::cout<<"Sending \"connect\" command..."<<std::endl;
			BYTE* ss = SendCommand(reinterpret_cast<BYTE*>(
				"<command id='connect'>"
				"<login>KOKS</login><password>koks</password>"
				"<host>192.168.15.15</host><port>3901</port>"
				"<logsdir>.\\LOGS\\</logsdir><loglevel>0</loglevel></command>"));
			std::cout<<reinterpret_cast<const char*>(ss)<<std::endl;
			FreeMemory(ss);
	
			Sleep(10000);
	
#ifdef CONNECTOR_166PLUS
			// Смена уровня логирования библиотеки
			int newLevel = 2;
			std::cout<<"Log level change. Previous level: "<< level <<". New level: " << newLevel <<std::endl;
			res = SetLogLevel(newLevel);
			if (res) {
				std::cout<<"Failed to set log level: "<<res<<std::endl;
				FreeMemory(res);
			} else {
				std::cout<<"Log level changed successfully!"<<std::endl;
			}
#endif
	
			/* 
			В команде 'subscribe' идентификаторы приведены для примера.
			В реальном коде необходимо использовать данные, присылаемые сервером
			*/
			std::cout<<"Sending \"subscribe\" command..."<<std::endl;
			ss = SendCommand(reinterpret_cast<BYTE*>("<command id='subscribe'>"
				"<alltrades><secid>304</secid></alltrades>"  
				"<quotations><secid>304</secid></quotations>" 
				"<quotes><secid>304</secid></quotes>"
				"</command>"));
			std::cout<<reinterpret_cast<const char*>(ss)<<std::endl;
			FreeMemory(ss);
	
			Sleep(1000);
	
			std::cout<<"Sending \"disconnect\" command..."<<std::endl;
			ss = SendCommand(reinterpret_cast<BYTE*>(
				"<command id='disconnect'/>"));
			std::cout<<reinterpret_cast<char*>(ss)<<std::endl;
			FreeMemory(ss);
	
#ifdef CONNECTOR_166PLUS
			// Деинициализация библиотеки 
			std::cout<<"Uninitializing library..." <<std::endl;
			res = UnInitialize();
			if (res) {
				sprintf_s(error, buffSize, "Failed to uninitialize library: %s", res);
				FreeMemory(res);
				throw std::runtime_error(error);
			} else {
				std::cout<<"Library uninitialized successfully!"<<std::endl;
			}
#endif
		} catch (std::runtime_error& e) {
			std::cout<<"A fatal error occurred: "<<e.what()<<std::endl;
			UnloadLibrary(hm);
			mainResult = -1;
		}
	}
	int err = GetLastError();
	xmlfile<<"</root>";

	int c;
	printf( "Press ENTER to continue... " );
	fflush( stdout );
	do c = getchar(); while ((c != '\n') && (c != EOF));
	return mainResult;
}