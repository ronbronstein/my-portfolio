// File: scripts/cleanup.js
/**
 * Script to clean up the codebase:
 * - Remove console.log statements
 * - Standardize import ordering
 * - Ensure consistent newlines at EOF
 * - Check for unused imports
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directories to scan
const DIRS_TO_SCAN = ['src'];

// File extensions to process
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

// Patterns to search for
const PATTERNS = {
  CONSOLE_LOG: /console\.log\([^)]*\);?/g,
  TODO_COMMENTS: /\/\/ TODO:.*/g,
  IMPORT_REACT: /import React,?.*from ['"]react['"];?/,
};

// Function to find all files recursively
function findFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    
    if (stat && stat.isDirectory()) {
      // Ignore node_modules and .next
      if (file.indexOf('node_modules') === -1 && file.indexOf('.next') === -1) {
        results = results.concat(findFiles(file, extensions));
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(file);
      }
    }
  });
  
  return results;
}

// Function to process a file
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove console.log statements
  const consoleMatches = content.match(PATTERNS.CONSOLE_LOG);
  if (consoleMatches) {
    content = content.replace(PATTERNS.CONSOLE_LOG, '');
    console.log(`  Removed ${consoleMatches.length} console.log statements`);
    modified = true;
  }
  
  // Highlight TODO comments
  const todoMatches = content.match(PATTERNS.TODO_COMMENTS);
  if (todoMatches) {
    console.log(`  Found ${todoMatches.length} TODO comments`);
    todoMatches.forEach(todo => {
      console.log(`    ${todo}`);
    });
  }
  
  // Ensure file ends with a newline
  if (!content.endsWith('\n')) {
    content += '\n';
    modified = true;
  }
  
  // Update file if modified
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  File updated`);
  }
}

// Main function
function main() {
  console.log('Starting code cleanup...');
  
  let totalFiles = 0;
  
  DIRS_TO_SCAN.forEach(dir => {
    const files = findFiles(dir, EXTENSIONS);
    totalFiles += files.length;
    
    files.forEach(file => {
      processFile(file);
    });
  });
  
  console.log(`\nProcessed ${totalFiles} files`);
  console.log('Running ESLint...');
  
  // Run ESLint to fix simple issues
  exec('npx eslint --fix src/**/*.{ts,tsx,js,jsx}', (error, stdout, stderr) => {
    if (error) {
      console.error(`ESLint error: ${error}`);
      return;
    }
    console.log('ESLint completed');
    console.log(stdout);
  });
}

main();