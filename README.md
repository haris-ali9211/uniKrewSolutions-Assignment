# Opulent Sips


## Table of Contents

- [Getting Started](#getting-started)
  - [Admin Panel](#admin-panel)
  - [Mobile App](#mobile-app)
  - [How to Get IP Address from Command Prompt (CMD)](#setupforIP)

## Getting Started

Before you start using this project, make sure to configure the IP address for both the Admin Panel and the Mobile App. Follow the instructions below:

### Admin Panel

1. Navigate to the `admin-panel` directory.
2. Open the `src/config/config.js` file in your code editor.
3. Replace 'http://enter-your-ip-here/api' with your server's actual IP address and API endpoint.

   ```javascript
   // admin-panel/src/config/config.js

   // Update the baseURL to your server's IP address and API endpoint
   const baseURL = 'http://enter-your-ip-here/api';
   
   export default {
     baseURL,
     // ...other configuration options
   };


### Mobile App

1. Navigate to the `uniKrew` directory.
2. Open the `src/config/config.js` file in your code editor.
3. Replace 'http://enter-your-ip-here/api' with your server's actual IP address and API endpoint.

   ```javascript
   // admin-panel/src/config/config.js

   // Update the baseURL to your server's IP address and API endpoint
   const baseURL = 'http://enter-your-ip-here/api';
   
   export default {
     baseURL,
     // ...other configuration options
   };
### How to Get IP Address from Command Prompt (CMD) - Windows

In Windows, you can use the Command Prompt (CMD) to quickly obtain the IP address of your computer or a specific network interface. Follow these steps to find your IP address:

## Steps

1. **Open Command Prompt**:

   - Press `Win + R` to open the Run dialog.
   - Type `cmd` and press Enter, or
   - Search for "Command Prompt" in the Start menu and click on it.

2. **Run the `ipconfig` Command**:

   In the Command Prompt window, type the following command and press Enter:

   ```shell
   ipconfig
 3. **View Network Interface Information:**:
 You will see a list of network interfaces and their configurations. Look for the network interface that you want to find the IP address for. Typically, you are interested in the "IPv4 Address" for your active network connection.

For example, if you are using Wi-Fi, you will see something like this:
```yaml
Wireless LAN adapter Wi-Fi:

Connection-specific DNS Suffix  . : example.com
IPv4 Address. . . . . . . . . . . : 192.168.1.100
Subnet Mask . . . . . . . . . . . : 255.255.255.0
Default Gateway . . . . . . . . . : 192.168.1.1
```
In this example, the IPv4 Address is 192.168.1.100.
