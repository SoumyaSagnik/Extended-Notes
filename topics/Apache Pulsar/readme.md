# Apache Pulsar

**Apache Pulsar is a Cloud-Native Messaging and Event-Streaming Platform.**

- `Cloud-native`: Pulsar is designed to run in Elastic Cloud environments, across a variety of hardware configurations.

- `Distributed`: Pulsar is horizontally scalable, with clients and data segmented across multiple nodes with no single point of failure.

- `Messaging`: Pulsar supports `publish-subscribe` pattern and other common messaging paradigms.

- `Streaming`: Pulsar supports low-latency and long-term event capture, storage, and processing.

**Apache Pulsar is an open-source distributed pub-sub messaging system originally developed by Yahoo. It is designed to provide scalable, durable, and low-latency messaging capabilities for applications and systems.**

<br/>

Pulsar offers a publish-subscribe messaging model where **producers publish messages to topics, and consumers subscribe to those topics to receive messages**. It supports both traditional publish-subscribe and queueing models, allowing flexible message distribution patterns.

<p>Some key features of Pulsar include:</p>

- `Scalability`: Pulsar is built to scale horizontally, allowing it to handle high message throughput and large data volumes. It can distribute topics across multiple clusters, enabling seamless scaling as the system grows.

- `Durability`: Pulsar provides strong message durability by persisting messages to durable storage. This ensures that messages are not lost even in the event of system failures.

- `Low Latency`: Pulsar achieves low message delivery latency by leveraging an innovative architecture that separates the storage and compute layers. It uses Apache BookKeeper based storage system for efficient message persistance and Apache Heron or Apache Flink for processing.

- `Multi-tenancy`: Pulsar supports multi-tenancy, allowing multiple organizations or applications to share the same Pulsar cluster while maintaining isolation and security between tenants.

- `Geo-replication`: Pulsar supports geographic replication, enabling data to be replicated across multiple data centers or regions. This feature provides disaster recovery capabilities and allows for low-latency data access from different geographical locations.

- `Extensibility`: Pulsar provides a pluggable architecture that allows developers to extend and customize its functionalities. It supports custom connectors, protocols, and authentication mechanisms.

---

**Companies are adopting Apache Pulsar because it provides the ability to achieve both message queuing and data streaming in one architecture.**

<p>Traditionally, message queueing and data streaming have been addressed by separate systems or architecture, each with their own strengths and limitations. However, Apache Pulsar combines both messaging paradigms into a unified architecture, offering the benefits of both message queueing and data streaming in a single system.</p>

- `Message Queueing`: Message queueing systems focus on reliable and ordered message delivery. They provide features such as guaranteed message persistance, message acknowledgment, and support for different messaging patterns like point-to-point communication and publish-subscribe messaging. Message queues ensure that messages are delivered to consumers in a reliable and orderly manner, preserving message order and supporting message durability.

- `Data Streaming`: Data streaming systems emphasize the continuous and real-time processing of large volumes of data streams. They are designed to handle high-throughput data ingestion, processing, and analysis. Streaming systems typically provide features like event time handling, windowing, and processing guarantees such as exactly one semantics. They enable the processing of data streams in a scalable and fault-tolerant manner, often leveraging distributed computing frameworks like Apache Flink or Apache Spark.

<p>Apache Pulsar combines the best of both worlds by providing a unified architecture that supports both message queuing and data streaming within a single system. Here's how Apache Pulsar achieves this:</p>

- `Unified Messaging Model`: Apache Pulsar offers a messaging model that supports both message queuing and data streaming. It provides topics and subscriptions to handle both point-to-point and publish-subscribe messaging patterns, allowing applications to consume messages in a queue-like fashion or process data streams continuously.

- `Scalability and Durability`: Apache Pulsar is built to be highly scalable and fault-tolerant. It can handle high-throughput data streams, providing horizontal scalability by leveraging distributed storage and processing. At the same time, it ensures data durability through its integration with Apache BookKeeper, a reliable and replicated log storage system.

- `Real-Time Processing`: Apache Pulsar supports real-time processing of data streams through its built-in features like Pulsar Functions and Pulsar IO connectors. Pulsar Functions allow developers to write lightweight compute tasks that can be executed directly within the messaging infrastructure, enabling real-time transformations, aggregations, and filtering of data streams. Pulsar IO connectors provide seamless integration with external systems, allowing data to be ingested from and exported to various data sources and sinks.

---

**Messaging in Apache Pulsar**

<p>Messaging in Apache Pulsar revolves around the publish-subscribe pattern, where messages are published by producers and consumed by consumers. Some important terms related to messaging are listed below.</p>

- `Topics`: A topic in Apache Pulsar is a named stream of messages to which producers can publish. Topics provide a logical categorization for messages. They are organized hierarchically using a namespace and can have multiple partitions for scalability.

- `Producers`: Producers are responsible for publishing messages to topics. They can be client applications or services that generate data to be shared with customers. Producers publish messages `asynchronously` and can specify a particular topic.

- `Consumers`: Consumers subscribe to topics to receive messages. They can be individual applications or services that process the published data. Consumers can subscribe to specific topics or use wildcards to subscribe to multiple topics based on patterns.

- `Subscriptions`: A subscription represents the connection between a consumer and a topic. When a consumer subscribes to a topic, it creates a subscription that determines how messages are delivered to the consumer.

- `Message Persistence`: Pulsar stores messages durably to ensure data integrity and availability. Messages published to topics are written to a distributed log storage system, typically Apache BookKeeper, which provides fault tolerance and high durability.

- `Acknowledgment`: Pulsar supports message acknowledgment to ensure reliable message delivery. After a consumer receives and processes a message, it acknowledges the receipt to the `broker`. This acknowledgment allows the broker to remove the message from its internal buffers and marks it as successfully delivered.

- `Message Retention`: Pulsar provides configurable retention policies for messages. Administrators can define the retention duration or size of a topic, determining how long messages are retained in the system. This feature allows for replaying messages or processing historical data.

- `Message Replay`: Pulsar supports message replay, enabling consumers to consume messages published in the past. Consumers can seek to a specific position or timestamp within a topic and start consuming messages from that point. This capability is valuable for building applications that require historical data analysis or data recovery.

- `Dead Letter Queue`: Pulsar allows for the configuration of a dead letter queue (DLQ) for handling undeliverable messages. If a message fails to be processed by a consumer, it can be redirected to a DLQ for further analysis or manual intervention. In Pulsar, the dead letter queue feature is called `dead letter topic`. Pulsar allows you to configure a dead letter topic where these problematic messages arenautomatically routed. The dead letter topic is a separate topic that receives the failed messages, allowing you to isolate and manage them separately from the main processing flow.

**Here's how dead letter queues work in Apache Pulsar**

- `Error Handling`: WHen a consumer fails to process a message successfully, it can explicitly acknowledge the failure by not sending an acknowledgment back to the broker within the configured acknowledgment timeout. This indicates to Pulsar that the message should be considered as a failed message.

- `Dead Letter Topic Configuration`: In the consumer configuration, you can specify the dead letter topic where failed messages should be sent. The configuration defines the destination topic where the problematic messages will be automatically routed.

- `Routing to Dead Letter Topic`: Once a message is considered failed, Pulsar automatically routes it to the configured dead letter topic. The message is no longer available for consumption from the original topic and is instead sent to the dead letter topic for further analysis and troubleshooting.

- `Manual Intervention`: Messages in the dead letter topic can be inspected, analyzed, and processed manually to understand the reason for the failure and take appropriate actions. This might involve identifying and fixing the underlying issue, retrying the failed messages, or performing any necessary data cleansing or transformation.

**Pulsar also supports advanced messaging patterns like scheduled delivery.**

---

**Benefits of Apache Pulsar**

`Unified Messaging Platform`: Apache Pulsar provides a unified messaging and streaming platform, combining the benefits of both message queueing and data streaming within a single system.

<br/>

`Guaranteed Message Delivery`

- Guaranteed message delivery is a critical feature in Apache Pulsar that ensures messages published to topics are reliably delivered to consumers, even in the face of failures and disruptions. Apache Pulsar provides several mechanisms to achieve guaranteed message delivery.

- `Message Persistance`: Apache Pulsar stores messages in a durable and fault-tolerant manner. Messages are persisted to the storage layer, which uses Apache BookKeeper as the underlying distributed log storage system. BookKeeper replicates messages across multiple nodes, ensuring data durability and availability. If a Pulsar broker or a consumer fails, the messages are not lost, and the system can recover and resume delivery once the failure is resolved.

- `Acknowledgment System`: Pulsar employs an acknowledgment system to track the consumption status of messages. When a consumer receives and processes a message, it sends an acknowledgment back to the broker, indicating that the message has been successfully consumed. If a consumer fails to send an acknowledgment within a specified time, the broker assumes that the message delivery was unsuccessful and attempts to redeliver the message to another consumer.

- `At Least Once Delivery Semantics`: By default, Pulsar follows the at-least-once delivery semantics. This means that messages are guaranteed to be delivered to consumers at least once. In the event of a failure or network disuption, Pulsar will redeliver the messages to ensure they are consumed. However, this may result in duplicate messages being delivered to consumers, and it's teh responsibility of the consuming application to handle potential duplicates.

- `Message Replay`: Pulsar allows consumers to replay messages from a specific position in the topic's history. This feature is valuable for scenarios where consumers need to reprocess or re-consume messages.

`Resiliency`

- Resiliency is a crucial aspect of Apache Pulsar that ensures the system's ability to recover from failures, maintain message delivery guarantess, and provide uninterrupted service. Key aspects of resiliency in Apache Pulsar include:

- `Fault Tolerant Storage`: Apache Pulsar utilizes Apache BookKeeper as its storage layer, which provides fault-tolerant and durable storage for messages. BookKeeper replicates messages across multiple BookKeeper servers to ensure data availability and protection against server failures. In the event of a failure, Pulsar can recover and resume message delivery from the replicated copies, ensuring data duarability and preventing message loss.

- `Replicated Messaging`: Pulsar employs a replication mechanism to ensure high availability and fault tolerance. Messages published to Pulsar topics are automatically replicated across multiple brokers in a Pulsar cluster. This replication allows for load balancing, fault tolerance, and seamless failover. If a broker becomes unavailable, the replicated messages can still be accessed and consumed from other available brokers, ensuring uninterrupted message delivery.

- `Broker Level Fault Isolation`: In a Pulsar cluster, brokers operate independently and are isolated from each other at the fault level. This means that a failure or issue with one broker does not impact the functioning of other brokers in the cluster. This fault isolation ensures that failures are contained within a single broker, preventing them from affecting the overall availability and performance of the system.

- `Consumer Failover`: Apache Pulsar supports consumer failover to maintain message consumption even in the presence of failures. In the case of consumer failures, Pulsar can automatically redirect message delivery to other available and healthy consumers. This failover mechanism ensures that messages are not lost and can be reliably consumed by alternative consumers, providing resilience against consumer failures.

- `Cluster and Datacenter Replication`: Pulsar supports replication of data across multiple clusters and datacenters, providing geo-replication capabilities. By replicating messages across different geographic regions, Pulsar ensures high availability and disaster recovery. In the event of a datacenter failure, messages can still be accessed and consumed from replicated clusters, maintaining business continuity and minimizing the impact of localized disruptions.

- `Monitoring and Alerting`: Apache Pulsar provides monitoring and alerting capabilities through integration with various monitoring tools and frameworks.Operators can monitor the health and performance of Pulsar clusters, track message delivery rates, monitor resource utilization, and set up alerts to be notified of any anomalies or potential issues. This monitoring and alerting support enables proactive identification and resolution of potential problems, contributing to the overall resiliency of the system.

`Infinite Scalability`

- `Horizontal Scaling`: Apache Pulsar adopts a horizontally scalable architecture, meaning it can scale by adding more resources, such as brokers and storage servers, to the system. Pulsar's design allows for the addition of new brokers to distribute message processing and storage across a cluster of nodes. This horizontal scaling enables Pulsar to handle increasing message rates and storage requirements by distributing the workload across multiple nodes.

- `Decoupled Compute and Storage`: Pulsar decouples compute and storage, allowing them to scale independently. Message storage is handled by Apache BookKeeper, a distributed log storage system that can scale horizontally by adding more BookKeeper servers. The compute layer, which includes brokers responsible for message processing, can also scale horizontally to accommodate higher message processing demands. By decoupling compute and storage, Pulsar achieves elastic scalability, enabling the system to grow by adding more resources to either the compute or storage layer as needed.

- `Automatic Load Balancing`: Apache Pulsar includes load balancing mechanisms to distibute the message processing and storage workload evenly across the available resources. As new brokers or storage servers are added to the cluster, Pulsar automatically balances the message distribution, ensuring that the load is distributed efficiently. Load balancing helps prevent hotspots and ensures optimal resource utilization, contributing to the system's scalability.

- `Partitioning and Top Level Scaling`: Pulsar enjoys partitioned topics, which enable parallel processing of messages across multiple partitions. Each partition within a topic can be independently assigned to different brokers, allowing for parallel message processing. As the workload grows, Pulsar can dynamically increase the number of partitions for a topic, allowing for greater parallelism and scaling. This topic-level scaling further enhances Pulsar's ability to handle high message rates and increasing workloads.

- `Efficient Resource Utilization`: Pulsar optimizes resource utilization by employing techniques such as message batching, compression, and efficient networking protocols. By batching messages together, Pulsar reduces the overhead of individual message processing and improves overall throughput. Compression techniques reduce the storage and network bandwidth requirements, allowing for efficient data storage and transmission. Pulsar also leverages high-performance networking protocols to minimize latency and maximize throughput.

---

**Message Queuing**

<p>Message Queuing in Apache Pulsar refers to the capability of the system to store and deliver messages in a reliable and ordered manner. Pulsar provides a high-performance message queuing mechanism that allows producers to publish messages in a sequential and reliable fashion.</p>

- `Topics`: In Pulsar, messages are published to topics. Topics act as named channels or categories that messages are organized into. Producers publish messages to specific topics, and consumers subscribe to those topics to receive messages. Topics can be thought of as logical queues or channels that hold messages until they're consumed.

- `Publish Subscribe Model`: Pulsar follows a publish-subscribe model, where messages published to a topic are delivered to all subscribed consumers. This model allows for one-to-many message distribution, where multiple consumers can receive and process the same message independently.

- `Ordering`: Pulsar guarantees message ordering within a topic partition. Messages published to a topic partition are delivered to consumers in the same order they were published.

- `Message Durability`: Messages published to Pulsar are stored durably in a distributed log storage system, typically Apache BookKeeper. This ensures that messages are presisted and protected against data loss. Even in the event of failures or system restarts, Pulsar can recover and deliver messages reliably from the durable storage.

- `Consumer Groups`: Pulsar supports consumer groups, allowing multiple consumers to form a group and collectively consume messages from a topic. Each consumer in a group processes a subset of the messages, enabling parallel message processing. Pulsar ensures that each ensures that each message is delivered to only one consumer within a consumer group, allowing for load balancing and scalability.

- `Acknowledgement`: Pulsar employs an acknowledgement mechanism to track the consumption status of messages. When a consumer successfully processes a message, it sends an acknowledgement (ack) back to the Pulsar broker. The broker uses acknowledgements to determine the progress of message consumption and to track the delivery status of messages. If a consumer fails to acknowledge a messagewithin a specified time, Pulsar assumes that the message delivery was unsuccessful and attempts to redeliver the message to another consumer.

---

**Data Streaming**

<p>Data streaming in Apache Pulsar refers to the continuous and real-time processing of data from various sources. Pulsar provides a powerful and scalable platform for streaming data ingestion, processing, and consumption. Here's an overview of how data streaming works in Pulsar.</p>

- `Publish Subscribe Model`

- `Streaming Data Sources`: Pulsar can handle streaming data from various sources, such as IoT devices, log files, sensors, social media feeds, application events, and more. These data sources continuously generate data in real-time, and Pulsar provides the infrastructure to ingest and process this data as it arrives.

- `Real Time Data Ingestion`: Pulsar supports high throughput and low-latency data ingestion. Producers can publish data to Pulsar topics at a high rate, and Pulsar effectively handles the storage and distribution of data. Pulsar's architecture, with the separation of compute and storage layers, allows for elastic scaling to handle increasing data volumes and ingestion rates.

- `Stream Processing`: Pulsar integrates with stream processing frameworks, such as Apache Flink and Apache Spark, to enable real-time data processing on the ingested data. These frameworks can be connected to Pulsar as consumers, allowing them to process the data stream in parallel and perform various operations like filtering, transforming, aggregating and enriching the data in real-time.

- `Multi Tenancy and Security`: Pulsar orovides multi-tenancy support, allowing different organizations or users to share the same Pulsar cluster while maintaining data isolation and access control. Pulsar also offers security features like authentication, authorization, encryption, and data governance to ensure data privacy and compliance.

---

**Message Partitioning**

<p>Message partiotioning in Apache Pulsar is a mechanism used to distribute messages across multiple partitions within a topic. It enables parallel processing and scalability by allowing different messages to be processed independently and in parallel by different consumers. Here's an explanation of how message partitioning works in Pulsar.</p>

- `Partitioned Topics`: In Pulsar, a topic can be partitioned into multiple logical segments called partitions. Each partition is an ordered sequence of messages, and messages published to a topic are evenly distributed among these partitions based on a partitioning scheme.

- `Partitioning Scheme`: Pulsar provides flexible options for partitioning messages. The partitioning scheme can be determined based on various factors, such as message key, round-robin distribution, or a custom partitioning function defined by the user. The chosen scheme determines how messages are mapped to partitions.

- `Message Routing`: When a producer publishes a message to a partitioned topic, Pulsar uses the partitioning scheme to determine the target partition for the message. The scheme takes into account the message's key or applies the defined distribution logic to determine which partition the message should be sent to. This ensures that messages with the same key are always routed to the same partition, maintaining message order for messages with the same key.

- `Independent Processing`: Each partition within a topic is independent and can be processed by different consumers concurrently. Consumers within a consumer group are typically responsible for processing different partitions. By distributing partitions across multiple consumers, Pulsar enables parallel message processing, improving overall throughput and scalability.

- `Dynamic Partition`: Pulsar supports dynamic partitioning, allowing the number of partitions for a topic to be increased or decreased as needed. This enables scaling the message processing capacity by adding more partitions and distributing the workload across a larger number of consumers.

- `Load Balancing`: Pulsar ensures load balancing across partitions and consumers. When multiple consumers are subscribed to a partitioned topic, Pulsar automatically balances the message distribution across consumers by assigning partitions to consumers in a balanced manner. This ensures that the workload is evenly distributed and that each consumer has a similar number of partitions to process.
