#!/bin/bash


# Open terminal for pc-1 process
gnome-terminal -- bash -c 'cd pc-1; node main.js; bash'

# Open terminal for pc-2 process
gnome-terminal -- bash -c 'cd pc-2; node main.js; bash'

# Open terminal for pc-2 process
# gnome-terminal -- bash -c 'cd pc-3; node main.js; bash'

# Open terminal for master process
gnome-terminal -- bash -c 'cd master; node main.js; bash'
