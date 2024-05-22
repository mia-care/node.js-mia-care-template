#!/bin/bash

METHOD=$1;
ENDPOINT=$2;
NAME=$3;

echo "Start creation of the endpoint: $METHOD $ENDPOINT";

###### CREATE FILES ######

# Check IFS on "/"
IFS="/"

# Split the string into an array of strings
read -ra array <<< "$ENDPOINT"

# ENDPOINT_COMPONENTS array
ENDPOINT_COMPONENTS=()

# Iterate on array elements
for item in "${array[@]}"; do
  # Check if the element contains ":"
  if [[ "$item" != *:* ]]; then
    # Add element to the ENDPOINT_COMPONENTS array
    ENDPOINT_COMPONENTS+=("$item")
  fi
done

ENDPOINT_TREE=""

# Iterate on array elements
for ((i=0; i<${#ENDPOINT_COMPONENTS[@]}; i++)); do
  # Concatenate the element
  ENDPOINT_TREE+="${ENDPOINT_COMPONENTS[i]}"
  
  # Add "/" only if it is not the last element
  if [ $i -lt $((${#ENDPOINT_COMPONENTS[@]}-1)) ]; then
    ENDPOINT_TREE+="/"
  fi
done

# Creation of the folder tree
FOLDER="./src/endpoints"$ENDPOINT_TREE"/"$METHOD

FOLDER="${FOLDER,,}" 
TEST_FOLDER="$FOLDER/__tests__"

# Check if the folder path exists
if [ -d "$FOLDER" ]; then
  echo "The folder $FOLDER already exists. The procedure will be stopped."
  exit 0
else
  # Create folder tree
  mkdir -p "$FOLDER"
  # Create test folder
  mkdir -p "$TEST_FOLDER"
  echo "The folder $FOLDER has been created successfully."
fi

# Creations of the files
cat ./scripts/new-endpoint/templates/handler.js > "$FOLDER"/handler.js""
echo "handler.js file created"
cat ./scripts/new-endpoint/templates/schema.js > "$FOLDER"/schema.js""
echo "schema.js file created"

# We need to transform the slashes ("/") contained in the endpoint
# definition with the escaped version ("\/") in order to avoid
# errors during the interpolation with the command "sed"
ESCAPED_ENDPOINT=$(echo "$ENDPOINT" | sed 's/\//\\\//g')

INDEX_CONTENT=$(cat ./scripts/new-endpoint/templates/index.js)
INTERPOLATED_INDEX_CONTENT=$(echo "$INDEX_CONTENT" | sed "s/{{METHOD}}/$METHOD/g" | sed "s/{{ENDPOINT}}/$(echo "$ENDPOINT" | sed 's/\//\\\//g')/g")
echo "$INTERPOLATED_INDEX_CONTENT" > "$FOLDER"/index.js""
echo "index.js file created"

TEST_FILE_CONTENT=$(cat ./scripts/new-endpoint/templates/handler.test.js)
INTERPOLATED_TEST_FILE_CONTENT=$(echo "$TEST_FILE_CONTENT" | sed "s/{{METHOD}}/$METHOD/g" | sed "s/{{ENDPOINT}}/$(echo "$ENDPOINT" | sed 's/\//\\\//g')/g")
echo "$INTERPOLATED_TEST_FILE_CONTENT" > "$TEST_FOLDER"/handler.test.js""
echo "handler.test.js file created"

echo "Endpoint created successfully"

###### EDIT INDEX ######

# Name of the file to modify
file_name="./index.js"

# String to search for in the file
search_string="module.exports ="

# Line to add before the line containing the string
endpoint_declaration="const $NAME = require('$FOLDER')
"

# Line to add after the line containing the string
endpoint_register="  service.register($NAME)"

# Find the position of the line containing the string in the file
line_containing_string=$(grep -n "$search_string" "$file_name" | cut -d: -f1)

# Create a new temporary file
temp_file="./temp.js"

# Copy the lines before the line containing the string to the temporary file
head -n "$((line_containing_string-1))" "$file_name" > "$temp_file"

# Add the new line to the temporary file
echo "$endpoint_declaration" >> "$temp_file"

# Add module.exports line
head -"$((line_containing_string))" "$file_name" | tail -1 >> "$temp_file"

# Add the new line to the temporary file
echo "$endpoint_register" >> "$temp_file"

# Copy the rest of the lines from the original file to the temporary file
tail -n "+$(($line_containing_string+1))" "$file_name" >> "$temp_file"

# Overwrite the original file with the modifications from the temporary file
mv "$temp_file" "$file_name"
