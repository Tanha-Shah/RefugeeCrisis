var blockCols;
// blockCols = Math.ceil(Math.sqrt(persons.length));
var otherCountryPersons;
function showBlock() {
    
    blockCols = Math.ceil(Math.sqrt(persons.length));
    otherCountryPersons = [];

    var otherCountryData = [];
    Object.assign(otherCountryData, allCountriesData);
    otherCountryData = otherCountryData.splice(20, allCountriesData.length);
    var otherPersonCount = 0
    otherCountryData.forEach((c, idx) => {
        var total = Math.round(c.total / ratio);
        otherPersonCount += c.total;
        var cumulative = { 2011: c.years[2011], 2012: 0, 2013: 0, 2014: 0, 2015: 0, 2016: 0, 2017: 0, 2018: 0 };

        for (i = 2012; i <= 2018; i++) {
            cumulative[i] = cumulative[i - 1] + c.years[i];
        }

        var nodes = d3.range(total).map(function (d, i) {
            return {
                size: size,
                year: getYear(i, cumulative),
                country: c.country
            }

        })
        otherCountryPersons = otherCountryPersons.concat(nodes);

    })
    console.log(otherCountryPersons);
    console.log(otherPersonCount);

    var units = svg
        .selectAll('rect')
        .data(persons)

    units.exit().remove();

    units
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return (i % blockCols) * size;
        })
        .attr('y', function (d, i) {
            return height - (Math.floor((i / blockCols)) * size);
        })

}

function showOtherCountryPersons() {

    console.log("+ other countries")

    blockCols = Math.ceil(Math.sqrt(persons.length));
    var personsCopy = [];
    Object.assign(personsCopy, persons);
    personsCopy = personsCopy.concat(otherCountryPersons);

    var units = svg
        .selectAll('rect')
        .data(personsCopy)

    units.exit().remove();

    var unitsEnter = units
        .enter()
        .append('rect')
        .attr('class', function (d, i) {
            'year' + d.year
        })
        .attr('height', function (d) {
            return d.size;
        })
        .attr('width', function (d) {
            return d.size;
        })


    units = units.merge(unitsEnter);
    
    units
        .style("fill", function (d) {
            return colorScale(d.year % 2011)
        })
        .attr("class", function (d, i) {
            if (i < 2154)
                return "resettled";
            else
                return "not_resettled"
        })
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return ((i) % blockCols) * size;
        })
        .attr('y', function (d, i) {
            return height - (Math.floor(((i) / blockCols)) * size);
        })

}
//show same color for all asylum seeksers
function changeColor() {

    var personsCopy = [];
    Object.assign(personsCopy, persons);
    personsCopy = personsCopy.concat(otherCountryPersons);

    var units = svg
        .selectAll('rect')
        .data(personsCopy)

    units.exit().remove();

    var unitsEnter = units
        .enter()
        .append('rect')
        .attr('class', function (d, i) {
            'year' + d.year
        })
        .attr('height', function (d) {
            return d.size;
        })
        .attr('width', function (d) {
            return d.size;
        })


    units = units.merge(unitsEnter);

    units
        .style("fill", "red")
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return ((i) % blockCols) * size;
        })
        .attr('y', function (d, i) {
            return height - (Math.floor(((i) / blockCols)) * size);
        })


}

function splitResettled() {
    d3.selectAll(".not_resettled")
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return ((2154 + i) % blockCols) * size;
        })
        .attr('y', function (d, i) {
            return height - (Math.floor(((2154 + i) / blockCols)) * size) - 250;
        })
        

    d3.selectAll(".resettled")
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {
            return (i % blockCols) * size;
        })
        .attr('y', function (d, i) {
            return height - (Math.floor((i / blockCols)) * size) - 200;
        })
        .style("fill", "green")
}
