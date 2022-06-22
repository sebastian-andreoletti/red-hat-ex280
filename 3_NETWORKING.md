# Openshift Cheatsheet EX280 - Networking

## Service TLS encrypt at router - EDGE

### Generate certificates

```
openssl genrsa -out file.key 4096
openssl req    -new -key file.key -out file.csr -subj "/C=AR/ST=Argentina/CN=my-hostname.com"
openssl x509   -req -in file.csr -out file.crt -days 1825 -sha256  -signkey file.key
```

### Create route using tls

```
oc create route edge --service=_my_app --hostname=_my_app.host.name --cert=file.crt --key=file.key
oc get route | egrep -i 'my'
```

