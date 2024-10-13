document.getElementById("start-scanning").addEventListener("click", function() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner"),
            constraints: {
                facingMode: "environment" // Use rear camera
            },
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "upc_reader", "upc_e_reader"],
        },
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }   
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        const code = data.codeResult.code;
        document.getElementById("result").textContent = `Scanned Barcode: ${code}`;
        console.log(code);
        // Stop scanning after detection
        //Quagga.stop();
    });
});