## Tagro

 leading provider of high-quality piping solutions, specializing in PPR, PPH, and UPVC pipes and fittings.

#### License
MIT


---

# How to Install ERPNext Version 15 on Ubuntu 24.04 or Windows: A Step-by-Step Guide

## Introduction
Welcome to this guide on installing ERPNext Version 15 on either Ubuntu 24.04 or Windows. ERPNext is a versatile, open-source ERP system that helps businesses manage everything from inventory to accounting. This tutorial will provide detailed, step-by-step instructions to ensure a smooth setup on either Linux or Windows.

## Prerequisites
### Software Requirements
- **Ubuntu 24.04** or **Windows 10/11** (with WSL enabled)
- A user with sudo/administrator privileges
- **Python 3.11+**
- **pip 20+**
- **MariaDB 10.3.x**
- **Node.js 18**
- **Yarn 1.12+**

### Hardware Requirements
- **4GB RAM**
- **40GB Hard Disk**

## Step 1: Update and Upgrade Packages (For Ubuntu/Linux)
For Linux systems, make sure to update and upgrade the packages first:

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

For Windows users, ensure your **Windows Subsystem for Linux (WSL)** is installed and updated. Open PowerShell as Administrator and run:

```bash
wsl --install
```
Then install Ubuntu within WSL.

## Step 2: Create a New User (Frappe Bench User)
It’s recommended to either create a new user specifically for managing Frappe Bench or proceed with your default user. Below are the options:

### Option 1: Create a New User (Linux only)
```bash
sudo adduser frappe
sudo usermod -aG sudo frappe
su frappe
cd /home/frappe
```

### Option 2: Use Default User
You can skip creating a new user and proceed with your default user to manage the Frappe Bench environment, especially if you prefer a single user for simplicity.

## Step 3: Install Required Packages
### 3.1 Install Git
```bash
sudo apt-get install git -y
```
On Windows, install [Git for Windows](https://git-scm.com/) and ensure it is added to your PATH.

### 3.2 Install Python and Dependencies
#### Python 3.11+ and Virtualenv
```bash
sudo apt-get install python3-dev python3.11-venv -y
sudo apt-get install python3-pip -y
```

On Windows, Python can be installed from the [official site](https://www.python.org/downloads/), and virtualenv via:

```bash
pip install virtualenv
```

## Step 4: Install MariaDB
ERPNext requires MariaDB. Install it using:

```bash
sudo apt-get install mariadb-server -y
sudo mysql_secure_installation
```

When prompted, you have the option to make the MariaDB root password the same as your device password, or create a unique one. Example steps:

1. When you run this command, the server will show the following prompts. Please follow the steps as shown below to complete the setup correctly.
2. Enter current password for root: (Enter your SSH root user password)
3. Switch to unix_socket authentication [Y/n]: Y
Change the root password? [Y/n]: Y
4. It will ask you to set new MySQL root password at this step. This can be different from the SSH root user password.
5. Remove anonymous users? [Y/n] Y
6. Disallow root login remotely? [Y/n]: N
7. This is set as N because we might want to access the database from a remote server for using business analytics software like Metabase / PowerBI / Tableau, etc.
8. Remove test database and access to it? [Y/n]: Y
9. Reload privilege tables now? [Y/n]: Y

Edit the MySQL config to enable proper encoding:

```bash
sudo nano /etc/mysql/my.cnf
```
Add the following:

```
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
```
Restart the MariaDB service:

```bash
sudo service mysql restart
```

## Step 5: Install Redis and Other Dependencies
### 5.1 Install Redis
```bash
sudo apt-get install redis-server -y
```

### 5.2 Install Node.js, NPM, and Yarn
For both Linux and Windows:

```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
nvm install 18
sudo npm install -g yarn -y
```

### 5.3 Install wkhtmltopdf
```bash
sudo apt-get install xvfb libfontconfig wkhtmltopdf -y
```

## Step 6: Install Frappe Bench
Install Frappe Bench using pip and the necessary flags:

```bash
sudo -H pip3 install frappe-bench --break-system-packages
```

On Windows, you may need to use WSL to run this command within the Ubuntu terminal.

## Step 7: Initialize Frappe Bench
```bash
bench init frappe-bench --frappe-branch version-15
cd frappe-bench
```

## Step 8: Create a New Site
Now, create a new site for your ERPNext installation:

```bash
bench new-site [site-name]
```

## Step 9: Install ERPNext and Other Apps
Install the ERPNext app:

```bash
bench get-app --branch version-15 erpnext
bench --site [site-name] install-app erpnext
```

For other apps (like HRMS):

```bash
bench get-app hrms
bench --site [site-name] install-app hrms
```

## Step 10: Start the ERPNext Server
```bash
bench start
```

Visit `http://[your-server-ip]:8000` to access ERPNext.

## Step 11: Setting ERPNext for Production (Optional)
### 11.1 Enable Scheduler
```bash
bench --site [site-name] enable-scheduler
```

### 11.2 Setup Production Config and NGINX
```bash
sudo bench setup production [frappe-user]
bench setup nginx
sudo supervisorctl restart all
```

Now your instance will start automatically and be accessible without using the port number.
