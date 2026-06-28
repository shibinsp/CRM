resource "kubernetes_service" "beeaxcrm_server" {
  metadata {
    name      = "${var.beeaxcrm_app_name}-server"
    namespace = kubernetes_namespace.beeaxcrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.beeaxcrm_app_name}-server"
    }
    session_affinity = "ClientIP"
    port {
      name        = "http-tcp"
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}
