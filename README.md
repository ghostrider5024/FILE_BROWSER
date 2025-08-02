# 📁 FILE_BROWSER (Local Folder HTTP Server)

Tool nhỏ gọn để chia sẻ thư mục cục bộ qua mạng nội bộ bằng Node.js. Cực kỳ hữu ích nếu bạn muốn truy cập nhanh file/folder từ máy khác trong cùng Wi-Fi.

---

## 🚀 Yêu cầu

- Cài sẵn [Node.js](https://nodejs.org/)
- Hệ điều hành: Windows hoặc Linux

---

## 📋 Hướng dẫn sử dụng

### 🖥️ Trên Windows

1. Tải repo về hoặc clone:
    ```shell
    git clone https://github.com/ghostrider5024/FILE_BROWSER.git
    cd FILE_BROWSER
    ```
2. Chạy file `run-server.bat` (double-click để mở)
3. Nhập đường dẫn thư mục bạn muốn chia sẻ, ví dụ:
    ```shell 
    D:\Downloads
    ```
4. Truy cập:
    - Trên máy bạn: http://localhost:8000  
    - Trên thiết bị khác cùng Wi-Fi: http://<IP-của-máy-bạn>:8000

---

### 🐧 Trên Linux

1. Mở terminal và chuyển vào thư mục project:
    ```bash
    git clone https://github.com/ghostrider5024/FILE_BROWSER.git
    cd FILE_BROWSER
    ```
2. Cấp quyền thực thi cho file shell:
    ```bash
    chmod +x run-server.sh
    ```
3. Mở port 8000 qua tường lửa:
    ```bash
    sudo ufw allow 8000/tcp
    ```
4. Chạy script:
    ```bash
    ./run-server.sh
    ```
5. Nhập đường dẫn thư mục bạn muốn chia sẻ, ví dụ:
    ```shell 
    /home/thank/Desktop/Trashes/Dumps
    ```
6. Truy cập:
    - Trên máy bạn: http://localhost:8000  
    - Trên thiết bị khác cùng Wi-Fi: http://<IP-của-máy-bạn>:8000

---

## 🌐 Cách kiểm tra địa chỉ IP

### 🖥️ Trên Windows
```shell
ipconfig
```

### 🐧 Trên Linux
```bash
ip a
```

## 📦 Port mặc định
- Port mặc định: 8000
- Có thể chỉnh trong server.js nếu cần

## 🛰️ Log ví dụ khi truy cập
```bash
🛰️ [127.0.0.1] GET /
📁 Đang truy cập thư mục: /home/thank/Desktop/Trashes/Dumps/
🛰️ [127.0.0.1] GET /ExampleFolder/
📁 Đang truy cập thư mục: /home/thank/Desktop/Trashes/Dumps/ExampleFolder/
🛰️ [127.0.0.1] GET /ExampleFolder/example_file.txt
📄 Đang lấy file: /home/thank/Desktop/Trashes/Dumps/ExampleFolder/dump_18022025.txt
```

## 💡 Một số lưu ý
- **Các thiết bị cần kết nối chung mạng Wi-Fi**
- **Nếu không truy cập được, hãy kiểm tra lại:**
    - *Địa chỉ IP có đúng không*
    - *Port có bị chặn bởi firewall không*
    - *Server có đang chạy không*