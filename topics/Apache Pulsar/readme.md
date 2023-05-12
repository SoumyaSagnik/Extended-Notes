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

- `Message Queueing`: Message queueing systems focus on reliable and ordered message delivery. They provide features such as guaranteed message persistance, message acknowledgement, and support for different messaging patterns like point-to-point communication and publish-subscribe messaging. Message queues ensure that messages are delivered to consumers in a reliable and orderly manner, preserving message order and supporting message durability.

- `Data Streaming`: Data streaming systems emphasize the continuous and real-time processing of large volumes of data streams. They are designed to handle high-throughput data ingestion, processing, and analysis. Streaming systems typically provide features like event time handling, windowing, and processing guarantees such as exactly onec semantics. They enable the processing of data streams in a scalable and fault-tolerant manner, often leveraging distributed computing frameworks like Apache Flink or Apache Spark.

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

- `Acknowledgement`: Pulsar supports message acknowledgement to ensure reliable message delivery. After a consumer receives and processes a message, it acknowledges the receipt to the `broker`. This acknowledgement allows the broker to remove the message from its internal buffers and marks it as successfully delivered.

- `Message Retention`: Pulsar provides configurable retention policies for messages. Administrators can define the retention duration or size of a topic, determining how long messages are retained in the system. This feature allows for replaying messages or processing historical data.

- `Message Replay`: Pulsar supports message replay, enabling consumers to consume messages published in the past. Consumers can seek to a specific position or timestamp within a topic and start consuming messages from that point. This capability is valuable for building applications that require historical data analysis or data recovery.

- `Dead Letter Queue`: Pulsar allows for the configuration of a dead letter queue (DLQ) for handling undeliverable messages. If a message fails to be processed by a consumer, it can be redirected to a DLQ for further analysis or manual intervention. In Pulsar, the dead letter queue feature is called `dead letter topic`. Pulsar allows you to configure a dead letter topic where these problematic messages arenautomatically routed. The dead letter topic is a separate topic that receives the failed messages, allowing you to isolate and manage them separately from the main processing flow.

**Here's how dead letter queues work in Apache Pulsar**

- `Error Handling`: WHen a consumer fails to process a message successfully, it can explicitly acknowledge the failure by not sending an acknowledgement back to the broker within the configured acknowledgement timeout. This indicates to Pulsar that the message should be considered as a failed message.

- `Dead Letter Topic Configuration`: In the consumer configuration, you can specify the dead letter topic where failed messages should be sent. The configuration defines the destination topic where the problematic messages will be automatically routed.

- `Routing to Dead Letter Topic`: Once a message is considered failed, Pulsar automatically routes it to the configured dead letter topic. The message is no longer available for consumption from the original topic and is instead sent to the dead letter topic for further analysis and troubleshooting.

- `Manual Intervention`: Messages in the dead letter topic can be inspected, analyzed, and processed manually to understand the reason for the failure and take appropriate actions. This might involve identifying and fixing the underlying issue, retrying the failed messages, or performing any necessary data cleansing or transformation.

---
