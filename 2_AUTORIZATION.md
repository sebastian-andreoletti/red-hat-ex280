# Openshift Cheatsheet EX280 - Autorization

## Local default role view,edit,admin,self-provicioner,cluster-reader,basic-user

```
oc policy add-role-to-user view dev01
oc policy add-role-to-user edit dev02
oc policy add-role-to-user self-provisioner ops01
```

## Custom roles

```
oc create role my-custom-role --verb=get,list --resource=pod -n my_project
oc policy add-role-to-user my-custom-role user01 -n my_project
```

## Cluster access

```
oc adm policy add-cluster-role-to-user cluster-admin adm01 

```

## Groups

```
oc adm groups new group-reader user01 user02
oc adm groups remove-users     user02
oc adm groups add-users        ops01
```

## Troubleshoot access control

```
oc policy who-can delete pod
oc describe rolebinding.rbac    custom-role-for-delete
oc policy remove-role-from-user custom-role-for-delete usernn
```

