from distinctipy import distinctipy

colors = distinctipy.get_colors(36)

print(colors)

# display the colours
a=distinctipy.color_swatch(colors)

for i in range(len(colors)):
    print("'rgb",colors[i],"',")
    