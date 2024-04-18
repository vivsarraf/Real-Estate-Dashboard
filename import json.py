import json
import os
import csv

def clean_properties(properties):
    """
    Cleaning the properties dictionary by removing specified fields and renaming 'ADDRESS_FULL'.
    """
    # List of property names to remove from the dictionary
    remove_fields = [
        'EMAIL', 'GEOID', 'RECEIVED_DATE', 'ADDRESS_POINT_ID', 'ADDRESS_NUMBER',
        'LINEAR_NAME_FULL', 'PLACE_NAME', 'LO_NUM', 'LO_NUM_SUF', 'HI_NUM',
        'HI_NUM_SUF', 'LINEAR_NAME_ID', 'WARD_2003', 'WARD_2018', 'MI_PRINX',
        'MUNICIPALITY', 'GENERAL_USE_CODE', 'CENTRELINE', 'WARD', 'ATTRACTION', 
        'MAP_ACCESS', 'ADDRESS_INFO'
    ]

    # Renaming 'ADDRESS_FULL' to 'Address' 
    cleaned_properties = {'Address': properties.pop('ADDRESS_FULL', None)}
    # Flatten geometry data
    # cleaned_properties['Geometry Type'] = geometry['type']
    # cleaned_properties['Coordinates'] = json.dumps(geometry['coordinates'])

    # Use dictionary comprehension to remove unwanted fields and update with geometry info
    cleaned_properties.update({key: value for key, value in properties.items() if key not in remove_fields})
    
    return cleaned_properties

def clean_geojson(geojson_data):
    """
    Iterating over all features in the GEOJSON data, cleaning properties and including geometry.
    """
    cleaned_features = []
    for feature in geojson_data['features']:
        # Clean properties of each feature
        feature['properties'] = clean_properties(feature['properties'])
        # Collect the cleaned features (currently commented out)
        # cleaned_features.append(cleaned_feature)

    # Replace original features with cleaned features (currently commented out)
    # geojson_data['features'] = cleaned_features
    return geojson_data

def export_to_csv(data, output_csv_path):
    """
    Exporting cleaned geojson data to a CSV file, including geometry information.
    """
    with open(output_csv_path, mode='w', newline='', encoding='utf-8') as csv_file:
        # Checking if there are features to export
        if data['features']:
            #Define the headers for the CSV file
            fieldnames = ['Address', 'Geometry Type', 'Coordinates']  # Add Geometry headers
            # Adding other property names as headers, excluding geometry fields for simplicity
            fieldnames += [key for key in data['features'][0]['properties'].keys() if key not in ('Address', 'Geometry Type', 'Coordinates')]
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            # Writing each feature's properties to the CSV
            for feature in data['features']:
                writer.writerow(feature['properties'])

def print_json(data):
    """
    Print the JSON content of the cleaned data, including geometry information.
    """
    print(json.dumps(data, indent=4))

def main():
    # Defining file paths
    file_path = os.path.join('Resources', 'Attractions.geojson')
    output_csv_path = os.path.join('Resources', 'Cleaned_Attractions.csv')
    output_json_path = os.path.join('Resources', 'Cleaned_Attractions.json')

    try:
        with open(file_path, 'r') as file:
            geojson_data = json.load(file)
            
        # Cleaning the GEOJSON data
        cleaned_geojson_data = clean_geojson(geojson_data)

        # Export to CSV
        export_to_csv(cleaned_geojson_data, output_csv_path)
        print(f"Data has been exported to CSV at {output_csv_path}")

        # Export to JSON
        with open(output_json_path, 'w') as file:
            json.dump(cleaned_geojson_data, file, indent=4)
        print(f"Data has been exported to JSON at {output_json_path}")

    except FileNotFoundError:
        print(f"The file {file_path} does not exist.")
    except json.JSONDecodeError:
        print("Error decoding JSON from the file.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()
