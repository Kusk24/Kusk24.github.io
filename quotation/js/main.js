/**
 * Accessory Shop Quotation System
 * Main JavaScript file for handling product management and calculations
 */

var data = [
    { quantity: 2, description: 'Stock Item Example 0001', unitPrice: 1000 },
    { quantity: 3, description: 'Stock Item Example 0002', unitPrice: 2000 },
    { quantity: 1, description: 'Service Charge Invoicing Item 001', unitPrice: 1000 },
    {
        quantity: 1,
        description: 'Service Charge Invoicing Item 002',
        details: ['Additional line 1 for this item', 'Additional line 2 for this item'],
        unitPrice: 200
    }
]

// Fetch the data from a given URL
var promise = fetch('http://127.0.0.1:5500/data/data.json')
// data has arrived, we transform it
var p2 = promise.then(data => {
    return data.json()
})
// data has been transformed, we use it
p2.then(json => {
    console.log('Data Received', json)
})

var quoationData = []

// Auto-fill price when product is selected
$(document).on('change', '#newItemProduct', function() {
    var selectedOption = $(this).find('option:selected');
    var price = selectedOption.data('price');
    if (price) {
        $('#newItemPPU').val(price);
    } else {
        $('#newItemPPU').val('');
    }
});

function addItem() {
    var d = $("#newItemProduct").val()
    var u = $("#newItemPPU").val()
    var q = $("#newItemQty").val()
    
    // Validation
    if (!d) {
        alert('Please select a product');
        return;
    }
    if (!u || u <= 0) {
        alert('Please enter a valid price');
        return;
    }
    if (!q || q <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    console.debug(d, u, q)

    // Clear the form
    $("#newItemProduct").val('')
    $("#newItemPPU").val('')
    $("#newItemQty").val('1')

    quoationData.push({
        description: d,
        quantity: Number.parseFloat(q),
        unitPrice: Number.parseFloat(u)
    })
    $('#exampleModal').modal('hide')
    renderTable()
}

function renderTable() {
    var data = quoationData
    var subTotal = 0
    data.forEach((e) => {
        subTotal = subTotal + (e.unitPrice * e.quantity)
    })
    var vat = (subTotal * .07).toFixed(2)
    var total = subTotal * 1.07

    console.log('subTotal', subTotal)
    $("#subTotal").html("" + subTotal)
    $("#vat").html("" + vat)
    $("#total").html("" + total)

    var dataRows = data.map((e, i) => {
        let amount = e.quantity * e.unitPrice
        return `<tr class="data-row">
                    <td>${e.quantity}</td>
                    <td>
                        <button class="btn-delete" onclick="deleteItem(${i})">X</button>
                        ${e.description}
                    </td>
                    <td>${e.unitPrice.toFixed(2)}</td>
                    <td>${amount.toFixed(2)}</td>
                </tr>`;
    })

    $(".data-row").remove()

    // Insert into the table
    dataRows.forEach((r) => {
        $('#quotationTable tbody').append(r)
    })

}

function deleteItem(i) {
    quoationData.splice(i, 1)
    renderTable()
}

$(document).ready(function () {
    $.getJSON('data/data.json',
        data => {
            // render the table
            quoationData = data;

            var d = new Date()
            $('#quotationDate').html(d.toDateString())
            renderTable()
        })

})
