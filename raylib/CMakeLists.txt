cmake_minimum_required(VERSION 3.0)
project(pakemon C)

set(CMAKE_C_STANDARD 99)

# Setting parameters for raylib
set(BUILD_EXAMPLES OFF CACHE BOOL "" FORCE) # don't build the supplied examples
set(BUILD_GAMES    OFF CACHE BOOL "" FORCE) # or games

add_subdirectory(libs/raylib)

add_executable(pakemon src/main.c)
target_link_libraries(pakemon PRIVATE raylib)
#target_compile_definitions(pakemon PUBLIC ASSETS_PATH="${CMAKE_CURRENT_SOURCE_DIR}/assets/") # Set the asset path macro to the absolute path on the dev machine
target_compile_definitions(pakemon PUBLIC ASSETS_PATH="assets/") # Set the asset path macro in release more
