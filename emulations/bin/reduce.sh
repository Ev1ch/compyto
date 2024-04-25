#!/bin/bash

# Open terminal for master process

# Open terminal for pc-1 process
gnome-terminal -- bash -c 'cd emulations/reduce/pc-1; tsx main.ts; bash'

# Open terminal for pc-2 process
gnome-terminal -- bash -c 'cd emulations/reduce/pc-2; tsx main.ts; bash'

gnome-terminal -- bash -c 'cd emulations/reduce/master; tsx main.ts; bash'