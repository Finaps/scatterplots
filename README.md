# Scatter Plots

This widget gives you the ability to create a simple chart that can be easily changed and configurable via a mendix object rather than
the widget configuration. Additionally giving users many options such as downloading the chart.  

##Authors

Simon Martyr -  [email](mailto:simon.martyr@finaps.nl)   - [github](https://github.com/simonmartyr)

## Contributing

For feature requests/bugs/etc please leave feedback on the Github Issues Page.

## Typical usage scenario

This widget can be used on:
- Desktop 
- Tablet 
- Phone

Display lots of data in whatever means you require. 
 
## Features

Main features:

- Define mode and types. 
- Download generated graphs.
- Zoom in and span.
- Toggle data. 
- Responsive. 
- Customizable. 


example Chart:


<img src="https://raw.githubusercontent.com/Finaps/scatterplots/master/readme/example.png"/>



### Limitations

 - TBD
 

## Description/configuration (Widget options)

Data Source 

- Main Object - The type of object that is used within the list.
- X Parm - The attribute from (Main Object) which referes to the String of X parmeters. 
- Y Parm - The attribute from (Main Object) which referes to the String of Y parmeters.
- Data Source Microflow - The Microflow that retrieves all the data of type (Main Object).
- Mode - The attribute from (Main Object) which referes to the String Mode parmeter.
- Name - The attribute from (Main Object) which referes to the String name parmeters.

Example Of Main Object

- X Parm : "1, 2, 3, 4" - A String of a comma seperated list of values for this set of data. 
- Y Parm : "1, 2, 3, 4" - A String of a comma seperated list of values for this set of data.
- Mode : "markers" - String containing the type of chart you wish to display.
- name : "markersName" - String containing the name of this set of data. 



## Styling - CSS Classes & HTML build up

HTML build up:

N/A