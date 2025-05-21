
resource "aws_launch_template" "instance" {
        name = "coconut_web"
        image_id = "ami-037843ed9009f7d41"
        instance_type = "t3.micro"
        key_name = "coconutkey"
        vpc_security_group_ids = [aws_security_group.instance.id] 
        user_data = base64encode(<<-EOF
                #!/bin/bash
                sudo yum -y install httpd
                sudo sed -i '/^Listen/c\Listen ${var.server_port}' /etc/httpd/conf/httpd.conf
                sudo systemctl restart httpd
                EOF
                )
  
    lifecycle {
      create_before_destroy = true
    }

}

# 키페어 연결결
data "aws_key_pair" "example" {
  key_name = "coconutkey"
}




resource "aws_autoscaling_group" "example" {
    min_size = 2
    max_size = 4
    desired_capacity = 2
    vpc_zone_identifier = var.private_subnet_ids

    launch_template {
        id      = aws_launch_template.instance.id
        version = "$Latest"
    }    
  
    tag {
      key   = "Name"
      value = "coconut_web_instance"
      propagate_at_launch = true
    }

  lifecycle {
    create_before_destroy = true
    replace_triggered_by = [ aws_launch_template.instance.user_data ]
   }

}