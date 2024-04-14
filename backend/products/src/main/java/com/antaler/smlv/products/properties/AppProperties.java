package com.antaler.smlv.products.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "smlv-app", ignoreUnknownFields = false)
public class AppProperties {

	private ExternalServicesProperties externalServices;

	private RedirectsProperties redirects;
}
