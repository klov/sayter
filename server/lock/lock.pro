TARGET = noqt
TEMPLATE = app
CONFIG += console
CONFIG -= qt
CONFIG   -= app_bundle
SOURCES += main.cpp \
    msql.cpp

LIBS += -L/usr/local/lib -lboost_system
LIBS += -L/usr/local/lib -lboost_regex
LIBS += -L/usr/local/lib -lboost_random
LIBS +=-L/usr/lib/x86_64 -lmysqlclient -lpthread -lz -lm -lrt -ldl
LIBS += -lpthread
INCLUDEPATH+=/usr/include/mysql
DEPENDPATH+=/usr/include/mysql

QMAKE_CXXFLAGS +=-D_WEBSOCKETPP_CPP11_STL_
QMAKE_CXXFLAGS +=-D_WEBSOCKETPP_NO_CPP11_REGEX_
QMAKE_CXXFLAGS += -std=c++0x
CONFIG += static
QMAKE_LFLAGS = -static

HEADERS += \
    msql.h
