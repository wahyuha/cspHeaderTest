#!/bin/bash

#get env value
filename=$1
source $filename

priv_name="privkey.pem"
pub_name="privkey.pub"
openssl genrsa -aes128 -passout pass:$KEY_PASS -out $priv_name $KEY_SIZE
openssl rsa -in $priv_name -passin pass:$KEY_PASS -pubout -out $pub_name

#add env public & private key
sed -i'.bak' -n -e 'H;${x;s/\n/\\n/g;p;}' $pub_name
sed -i'.bak' -n -e 'H;${x;s/\n/\\n/g;p;}' $priv_name
echo "
PUBLIC_KEY=`cat $pub_name`" >> $filename
echo "PRIVATE_KEY=`cat $priv_name`" >> $filename

#add env git commit sha version
# search_git="{{GIT_SHA}}"
# replace_git=$(git rev-parse HEAD)
# sed -i'.bak' "s/$search_git/$replace_git/" $filename


rm -f $priv_name $pub_name
rm -f $priv_name'.bak' $pub_name'.bak'
rm -f $filename'.bak'