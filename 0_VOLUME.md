# Openshift Cheatsheet EX280 - Volumes / Storage

## Set Volume

```
oc get storageclasses
oc set volume  deployment/_my_app \
   --add --replace --name pvc-my-app --type pvc \
   --storage-class nfs-storage --claim-size 15Gi \
   --claim-mode rwo --mount-path /var/my_app   
```
### Remove PVC from deployment
```
oc set volume deploy/_my_app --remove --name pvc-my-app
```

### Delete PVC 
```
oc delete pvc/pvc-my-app
```

## Yaml

```yaml
kind: PersistenVolumeClaim
apiVersion: v1
metadata:
  name: pvc-my-app
spec:
  storageClass: nfs-storage
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 15Gi
```