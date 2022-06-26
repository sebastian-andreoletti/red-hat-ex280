# Openshift Cheatsheet EX280 - Network Policy

## Configura Network Policy

### Label namespace or Pods

```
oc label namespace my-project ENV=dev
oc label pod/pod-xxxxnnnnnssss ENV=dev
```

```yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: accept-dev
spec:
  podSelector: {}
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          ENV: "dev"
  - ports:
    - port: 8080
      protocol: TCP
```
