TARGET = noqt
TEMPLATE = app
CONFIG += console
CONFIG -= qt
CONFIG   -= app_bundle
SOURCES += main.cpp

LIBS += -L/usr/local/lib -lboost_system
LIBS += -L/usr/local/lib -lboost_regex
LIBS += -L/usr/local/lib -lboost_random
LIBS += -lpthread

QMAKE_CXXFLAGS +=-D_WEBSOCKETPP_CPP11_STL_
QMAKE_CXXFLAGS +=-D_WEBSOCKETPP_NO_CPP11_REGEX_
QMAKE_CXXFLAGS += -std=c++0x -lpthread
CONFIG += static
QMAKE_LFLAGS = -static
