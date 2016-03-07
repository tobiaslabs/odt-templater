#!/bin/bash

ODT_FILE_AND_PATH=$1
PATH_TO_UNPACK_ODT_FILE=$2
CWD=`pwd`

mkdir -p "${PATH_TO_UNPACK_ODT_FILE}"

cd "${PATH_TO_UNPACK_ODT_FILE}"

jar -xvf "${ODT_FILE_AND_PATH}"

cd "${CWD}"
