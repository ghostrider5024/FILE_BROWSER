#!/bin/bash

# Chuyển đến thư mục chứa script
cd "$(dirname "$0")"

# Gợi ý người dùng nhập đường dẫn folder muốn serve
read -p "Nhập đường dẫn folder muốn serve (mặc định là /home/thank/Desktop/Trashes/Dumps): " FOLDER_TO_SERVE

# Nếu người dùng không nhập gì thì gán giá trị mặc định
FOLDER_TO_SERVE=${FOLDER_TO_SERVE:-/home/thank/Desktop/Trashes/Dumps}

# Chạy server.js với tham số là folder vừa nhập
node server.js "$FOLDER_TO_SERVE"

# Dừng màn hình lại (nếu chạy từ GUI terminal)
read -p "Nhấn Enter để thoát..."

