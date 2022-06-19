# Openshift Cheatsheet EX280


## Manage OpenShift Container Platform
```json
oc get nodes
oc get events  | egrep -i zzzzzzzzzzzzz
oc adm top nodes
```

## Storage and volumes

```
oc set volume   deployment/_my_app_ \
       --add --replace --type pvc --claim-name nfs-storage \
	   --claim-size 15Gi --claim-mode rwo --mount-path /my/path/volume \
	   --claim-name my-storage-pvc 
```

## Manage users and policies

### HTPasswd
```
sudo yum install -y httpd-tools
touch /tmp/htpasswd
for USER in developer leader tester 
do
   echo $USER
   htpasswd -b -B /tmp/htpasswd $USER 123456
done
```

### Identity Provider htpasswd and new users
```
oc get oauth
oc get oauth cluster -o yaml > oauth.yaml
oc create secret generic htpass-secret --from-file htpasswd=/tmp/htpasswd -n openshift-config
oc replace -f oauth.yaml -n openshift-config && oc get pods -w -n openshift-authentication
for $USER in developer leader tester admin
do
   ech $USER
   oc login -u $USER -p 123456
done
oc login -u kubeadmin -p zzzzzzz
oc get users
oc get identities
```
### Groups
```
oc adm groups new developers developer
oc adm groups new leaders    leader 
oc adm groups new qa         tester
```

### Role-Based Access Control ( RBAC )

```
oc get clusterrolebinding -o wide | egrep -i 'project'
oc get rolebinding -o wide -n my-project
```

```
oc login -u admin -p yyyyyyyyyy
oc adm policy add-cluster-role-to-user cluster-admin    admin
oc adm policy add-cluster-role-to-user self-provisioner leaders
oc adm policy remove-cluster-role-from-group self-provisioner system:authenticated:oauth
```

```
oc create role role-name --verb=get,delete,edit --resource=pod -n my-project
oc adm policy add-role-to-user role-name myuser -n my-project --role-namespace=my-project
oc describe rolebindings.rbac  role-name -n my-project
oc adm remove-role-from-user   role-name myuser
```

```
oc describe role | egrep -i 'delete' | egrep -i 'project'
oc adm policy remove-role-from-user 

```

```
oc get identities
oc describe identity my_identity_provider:admin
oc get identit my_identity_provider:admin -o yaml
```

```

```

## Control access to resources

```
oc adm new-project my-project --node-selector key=value
oc describe project my-project | egrep -i 'node-selector' 
```

## Configure networking components
```
```

## Configure pod scheduling

### Max numbers of pods per node

```
oc describe machineconfigpools worker | egrep -i 'small'
oc label machineconfigpools worker custom-kubelet=small-pods
...
   kubeletConfig:
     podsPerCore: 10
     maxPods: 200
```


