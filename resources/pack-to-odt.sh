#!/bin/bash

PATH_OF_FILES_TO_PACK=$1
THE_ODT_FILE_AND_PATH=$2
CWD=`pwd`

cd "${PATH_OF_FILES_TO_PACK}"

jar cMf "${THE_ODT_FILE_AND_PATH}" *

# the order of flags and files matters
# c: create new archive
# M: do not generate a manifest file (assumes you have one already)
# f: specify file name

cd "${CWD}"
