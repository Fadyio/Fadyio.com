---
title: "Amazon EKS best practices you should know"
date: "2022-10-20"
tags: ["AWS" ]
author: "Fady"
showToc: true
TocOpen: false
description: "To get the most out of EKS, it's important to be aware of some best practices."
cover:
    image: /img/EKS-best-practices-you-should-know.webp
    alt: Best practices in EKS
    relative: true
---
In this article, we’ll explore some of the EKS best practices and learn how we can validate our custom resources against these best practices.
## 1. Make sure your resources limits size are configured the same as requests
Pods is scheduled based on requests only, These pods are scheduled based on the resources they request and not on the resources they are allowed to consume. This means that a pod will only be placed on a node if the node's available capacity can meet the pod's resource requests. However, resource limits are not considered when scheduling pods, but they help to prevent a single pod from using up all the resources on a node due to an error or bug.

When pods reach their CPU limit, they are not evicted but instead, their CPU usage is throttled. However, if a pod tries to exceed its memory limit, it will be OOM and will need to be evicted.

Correctly sized requests are particularly important when using a node auto-scaling solution like Karpenter, Cluster AutoScaler, these tools look at your workload requests.

[For more](https://aws.github.io/aws-eks-best-practices/reliability/docs/dataplane/#configure-and-size-resource-requestslimits-for-all-workloads)

## 2. Limit capabilities needed by a container
The Linux kernel provides a set of privileges known as capabilities, which can be used to control the level of access that a container has to the host system. By default, Docker runs with a limited set of capabilities, but these can be modified using the --cap-drop and --cap-add options.

When using the --cap-drop option, certain capabilities can be removed from the container, which can help to harden the security of the container. On the other hand, using the --cap-add option, we can grant additional capabilities to the container, if there is a specific requirement for it. This way we can tailor the level of access that the container has to the host system, based on our specific needs.

In summary, Linux kernel capabilities allow you to fine-tune the level of access that a container has to the host system, and Docker provides options to modify these capabilities as needed, by dropping or adding capabilities, to better secure and run the container, It's recommended to avoid the following capabilities: ```Undefined/nil, AUDIT_WRITE, CHOWN, DAC_OVERRIDE, FOWNER, FSETID,KILL, MKNOD, NET_BIND_SERVICE, SETFCAP, SETGID, SETPCAP, SETUID, SYS_CHROOT```

[For more](https://kubernetes.io/docs/concepts/security/pod-security-standards/)

## 3. Make sure of capacity in each AZ when using EBS volumes

When using Amazon Elastic Kubernetes Service (EKS), it is recommended to create one node group per availability zone (AZ) to ensure that there is always enough capacity available to run pods that cannot be scheduled in other AZs. This helps to avoid potential issues with resource availability and ensures that pods can be scheduled as needed.

In EKS, worker nodes are automatically labeled with the "failure-domain.beta.kubernetes.io/zone" label, which contains the name of the AZ. This allows you to use node selectors to schedule a pod in a specific AZ. Additionally, if you use Amazon Elastic Block Store (EBS) to provide persistent volumes, the Kubernetes scheduler is able to determine the location of a worker node and schedule pods that require an EBS volume in the same AZ as the volume. However, if no worker nodes are available in the same AZ as the volume, the pod will not be scheduled, it's important to have at least one node group per AZ to avoid this issue.

[For more](https://aws.github.io/aws-eks-best-practices/reliability/docs/dataplane/#ensure-capacity-in-each-az-when-using-ebs-volumes)

## 4. Spread worker nodes and workloads across multiple AZs

When using Kubernetes, it is recommended to distribute nodes and pods across multiple availability zones (AZs) to ensure high availability and fault tolerance. This can be achieved through the use of Pod Topology Constraints, which are available in K8s version 1.18 and later. These constraints allow you to control how pods are spread across your cluster, including regions, zones, nodes, and other user-defined topology domains.

One of the Pod Topology Constraints settings is whenUnsatisfiable, which tells the scheduler how to handle pods that do not satisfy their spread constraints. By setting whenUnsatisfiable to DoNotSchedule, pods will be considered "unschedulable" if the topology spread constraint cannot be fulfilled. This should only be used if it is preferable for pods not to run rather than violating the topology spread constraint.
It's important to note that when using Pod Topology Constraints, it's important to make sure that there are enough resources available in each of the targeted topologies, otherwise pods will not be able to be scheduled and may become unschedulable.

[For more](https://aws.github.io/aws-eks-best-practices/reliability/docs/dataplane/#spread-worker-nodes-and-workload-across-multiple-azs)

## Summing it up
In my view, implementing governance policies is only the first step towards ensuring reliability, security, and stability for your Kubernetes cluster. I found it interesting to discover that using centralized policy management could also be a powerful way to overcome the often-challenging relationship between development and operations teams.
