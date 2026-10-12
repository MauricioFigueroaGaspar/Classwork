// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
import os from 'os';
// const os = require('os');
// TODO 2: Import third-party NPM packages (chalk)
import chalk from 'chalk';
import fs from 'fs-extra'

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);

        const totalMemMB = (os.totalmem()).toFixed(0);
        const usedMemMB = totalMemMB - freeMemMB;
        const cpuModel = os.cpus()[0].model;
        const uptimeHours = (os.uptime() / 3600).toFixed(3);


        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}\t\t${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("Free memory (MB):")}\t${chalk.yellow(freeMemMB)}`);
        console.log(`${chalk.bold("Total memory (MB):")}\t${chalk.yellow(totalMemMB)}`);
        console.log(`${chalk.bold("Used memory (MB):")}\t${chalk.yellow(usedMemMB)}`);
        console.log(`${chalk.bold("CPU model:")}\t\t${chalk.yellow(cpuModel)}`);
        console.log(`${chalk.bold("Uptime hours:")}\t\t${chalk.yellow(uptimeHours)}`);


        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREE_MEM: ${freeMemMB}MB | TOTAL_MEM: ${totalMemMB} | USED_MEM: ${usedMemMB} | CPU_MODEL: ${cpuModel} | UPTIME_HRS: ${uptimeHours}`;

        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        console.log("Writing log entry to disk...");

        const file = 'log.txt'
        fs.outputFile(file, logEntry)
            .then(() => fs.readFile(file, 'utf8'))
            .then(data => {
                console.log(data) // => hello!
            })
            .catch(err => {
                console.error(err)
            })

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();
