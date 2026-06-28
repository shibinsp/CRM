######################
# Required Variables #
######################
variable "beeaxcrm_pgdb_admin_password" {
  type        = string
  description = "TwentyCRM password for postgres database."
  sensitive   = true
}

variable "beeaxcrm_app_hostname" {
  type        = string
  description = "The protocol, DNS fully qualified hostname, and port used to access TwentyCRM in your environment. Ex: https://crm.example.com:443"
}

######################
# Optional Variables #
######################
variable "beeaxcrm_app_name" {
  type        = string
  default     = "beeaxcrm"
  description = "A friendly name prefix to use for every component deployed."
}

variable "beeaxcrm_server_image" {
  type        = string
  default     = "beeaxcrm/beeax:latest"
  description = "TwentyCRM server image for the server deployment. This defaults to latest. This value is also used for the workers image."
}

variable "beeaxcrm_db_image" {
  type        = string
  default     = "beeaxcrm/beeax-postgres-spilo:latest"
  description = "TwentyCRM image for database deployment. This defaults to latest."
}

variable "beeaxcrm_server_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the TwentyCRM server deployment. This defaults to 1."
}

variable "beeaxcrm_worker_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the TwentyCRM worker deployment. This defaults to 1."
}

variable "beeaxcrm_db_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the TwentyCRM database deployment. This defaults to 1."
}

variable "beeaxcrm_server_data_mount_path" {
  type        = string
  default     = "/app/packages/beeax-server/.local-storage"
  description = "TwentyCRM mount path for servers application data. Defaults to '/app/packages/beeax-server/.local-storage'."
}

variable "beeaxcrm_db_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "beeaxcrm_server_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "beeaxcrm_db_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for database persistent volume."
}

variable "beeaxcrm_db_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for database persistent volume claim."
}

variable "beeaxcrm_server_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "beeaxcrm_server_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for server persistent volume claim."
}

variable "beeaxcrm_namespace" {
  type        = string
  default     = "beeaxcrm"
  description = "Namespace for all TwentyCRM resources"
}

variable "beeaxcrm_redis_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the TwentyCRM Redis deployment. This defaults to 1."
}

variable "beeaxcrm_redis_image" {
  type        = string
  default     = "redis/redis-stack-server:latest"
  description = "TwentyCRM image for Redis deployment. This defaults to latest."
}

variable "beeaxcrm_docker_data_mount_path" {
  type        = string
  default     = "/app/docker-data"
  description = "TwentyCRM mount path for servers application data. Defaults to '/app/docker-data'."
}

variable "beeaxcrm_docker_data_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "beeaxcrm_docker_data_pv_capacity" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "beeaxcrm_docker_data_pvc_requests" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity reservation for server persistent volume claim."
}
