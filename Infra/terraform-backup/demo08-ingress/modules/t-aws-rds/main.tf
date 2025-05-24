resource "aws_db_instance" "default" {
  allocated_storage    = 10
  db_name              = "coconutdb"
  engine               = "mysql"
  engine_version       = "8.0.41"
  instance_class       = "db.t3.micro"
  username             = "admin"
  password             = "test1234"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
}

resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = [aws_subnet.frontend.id, aws_subnet.backend.id]

  tags = {
    Name = "My DB subnet group"
  }
}