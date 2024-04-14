package com.antaler.smlv.products.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@Configuration
public class KafkaProviderConfig {

	@Value("${spring.kafka.bootstrap-servers}")
	private String bootstrapServers;

	public Map<String, Object> producerConfig(String user, String pass) {
		var props = new HashMap<String, Object>();
		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		props.put("sasl.mechanism", "SCRAM-SHA-256");
		props.put("security.protocol", "SASL_SSL");
		props.put("sasl.jaas.config",
				"org.apache.kafka.common.security.scram.ScramLoginModule required username=\"%s\" password=\"%s\";"
						.formatted(user, pass));
		props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
		props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
				"org.apache.kafka.common.serialization.StringSerializer");

		return props;

	}

	@Bean
	ProducerFactory<String, String> providerFactory(@Value("${KAFKA_USER}") String kafkaUser,
			@Value("${KAFKA_PASS}") String kafkaPass) {
		return new DefaultKafkaProducerFactory<>(producerConfig(kafkaUser,kafkaPass));
	}

	@Bean
	KafkaTemplate<String, String> kafkaTemplate(ProducerFactory<String, String> producerFactory) {
		return new KafkaTemplate<>(producerFactory);
	}
}
