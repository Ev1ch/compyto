#!/bin/bash

# Open terminal for master process
gnome-terminal -- bash -c 'cd emulations/send-receive/master; tsx main.ts; bash'

# Open terminal for pc-1 process
gnome-terminal -- bash -c 'cd emulations/send-receive/pc-1; tsx main.ts; bash'

# Open terminal for pc-2 process
gnome-terminal -- bash -c 'cd emulations/send-receive/pc-2; tsx main.ts; bash'