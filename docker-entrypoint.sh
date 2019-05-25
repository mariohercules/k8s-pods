#!/bin/sh
#   Copyright 2019 Mario Hercules
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
set -e
NODE_MODE=${NODE_MODE:-${@}}

if [ -z ${NODE_MODE+x} ] ; then
    echo "You need to set the Webservice of the host to starting  (GRAPHQL or REST or SOAP )."
    exit 1
fi

#echo ${NODE_MODE}

npm run ${NODE_MODE}
