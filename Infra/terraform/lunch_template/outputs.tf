output "autoscaling_group" {
  value = aws_autoscaling_group.example.id
}

output "launch_template" {
    value = aws_launch_template.instance.id
}

output "aws_security_group" {
    value = aws_security_group.instance.id
}