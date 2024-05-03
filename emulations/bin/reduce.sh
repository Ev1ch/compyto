#!/bin/bash

# Open terminal for master process

powershell -Command "Start-Process cmd -ArgumentList '/k cd emulations/reduce/pc-1 && tsx main.ts && bash'"
powershell -Command "Start-Process cmd -ArgumentList '/k cd emulations/reduce/pc-2 && tsx main.ts && bash'"
powershell -Command "Start-Process cmd -ArgumentList '/k cd emulations/reduce/master && tsx main.ts && bash'"
