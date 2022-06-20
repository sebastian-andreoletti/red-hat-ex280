# Openshift Cheatsheet EX280 - Authentication

## Install htpasswd

```
sudo yum install -y httpd-tools
```

## Set up OAuth

### Create users

```bash
touch /tmp/htpasscustom
for USER in adm01 adm02 dev01 dev02 ops01 ops02 ; do
  echo $USER
  htpasswd -B -b /tmp/htpasscustom $USER '123@ASDasd'
done
cat /tmp/htpasscustom
```

```
oc create secret generic htpasswd-secret-custom --from-file htpasswd=/tmp/htpasscustom -n openshift-config
oc apply -f my_oauth.yaml
oc get pods -w -n openshif-authentication
```

### Create YAML
```yaml
kind: OAuth
apiVersion: config.openshift.io/v1
metadata:
  name: cluster
spec:
  identityProviders:
  - name: custom-identyity-provider
    type: HTPasswd
    mappingMethod: claim
    htpasswd:
      fileData:
        name: htpasswd-secret-custom
```
