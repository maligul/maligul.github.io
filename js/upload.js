function debugLog(message) {
    const debugArea = document.getElementById('debugLog');
    const timestamp = new Date().toISOString();
    debugArea.innerHTML += `<p>[${timestamp}] ${message}</p>`;
    console.log(`[${timestamp}] ${message}`);
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const logArea = document.getElementById('logArea');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file.name.endsWith('.py')) {
            logArea.innerHTML += `<p>Dosya yüklendi: ${file.name}</p>`;
        } else {
            logArea.innerHTML += '<p style="color: red;">Hata: Lütfen sadece .py uzantılı dosya yükleyin.</p>';
        }
    } else {
        logArea.innerHTML += '<p style="color: red;">Hata: Lütfen bir dosya seçin.</p>';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function suggestPackages() {
    const searchTerm = document.getElementById('packageSearch').value.toLowerCase();
    const packageSelect = document.getElementById('packageSelect');
    packageSelect.innerHTML = '<option value="">Paketler aranıyor...</option>';

    debugLog(`Arama terimi: ${searchTerm}`);

    if (searchTerm.length < 2) {
        packageSelect.innerHTML = '<option value="">Paket seçin veya arayın...</option>';
        return;
    }

    const matchedPackages = packages.filter(pkg => pkg.name.toLowerCase().includes(searchTerm));
    debugLog(`Eşleşen paket sayısı: ${matchedPackages.length}`);

    packageSelect.innerHTML = '';
    if (matchedPackages.length > 0) {
        matchedPackages.forEach(pkg => {
            pkg.versions.forEach(version => {
                const option = document.createElement('option');
                option.value = `${pkg.name}|${version}`;
                option.textContent = `${pkg.name} (${version})`;
                packageSelect.appendChild(option);
            });
        });
    } else {
        packageSelect.innerHTML = '<option value="">Paket bulunamadı</option>';
    }
}

function selectPackage() {
    const packageSelect = document.getElementById('packageSelect');
    const selectedValue = packageSelect.value;
    if (selectedValue) {
        const [name, version] = selectedValue.split('|');
        addToSelectedPackages(name, version);
    }
}

function addToSelectedPackages(name, version) {
    const selectedList = document.getElementById('selectedPackageList');
    const li = document.createElement('li');
    li.textContent = `${name} (${version})`;
    selectedList.appendChild(li);

    document.getElementById('packageSearch').value = '';
    document.getElementById('packageSelect').innerHTML = '<option value="">Paket seçin veya arayın...</option>';
    debugLog(`Paket seçildi: ${name} (${version})`);
}

function addCustomCommand() {
    const commandInput = document.getElementById('customCommandInput');
    const command = commandInput.value.trim();
    if (command) {
        const commandList = document.getElementById('customCommandList');
        const li = document.createElement('li');
        li.textContent = command;
        commandList.appendChild(li);
        commandInput.value = ''; // Input alanını temizle
        debugLog(`Custom komut eklendi: ${command}`);
    }
}

function saveConfiguration() {
    const pythonVersion = document.getElementById('pythonVersion').value;
    const selectedPackages = Array.from(document.getElementById('selectedPackageList').children)
        .map(li => li.textContent);
    const selectedOS = document.getElementById('osSelect').value;
    const customCommands = Array.from(document.getElementById('customCommandList').children)
        .map(li => li.textContent);
    const configParams = Array.from(document.getElementById('configList').children)
        .map(div => div.textContent);
    
    const logArea = document.getElementById('logArea');
    logArea.innerHTML += `<p>Yapılandırma kaydedildi:</p>`;
    logArea.innerHTML += `<p>Python Sürümü: ${pythonVersion}</p>`;
    logArea.innerHTML += `<p>Seçilen Paketler: ${selectedPackages.join(', ')}</p>`;
    logArea.innerHTML += `<p>İşletim Sistemi: ${selectedOS}</p>`;
    logArea.innerHTML += `<p>Custom Komutlar: ${customCommands.join(', ')}</p>`;
    logArea.innerHTML += `<p>Sistem Parametreleri: ${configParams.join(', ')}</p>`;
    debugLog(`Yapılandırma kaydedildi: Python ${pythonVersion}, Paketler: ${selectedPackages.join(', ')}, İşletim Sistemi: ${selectedOS}, Custom Komutlar: ${customCommands.join(', ')}, Sistem Parametreleri: ${configParams.join(', ')}`);
}

// Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bot Yükleme ve Yapılandırma sayfası yüklendi');
    // Burada gerekirse başlangıç işlemlerini yapabilirsiniz
});
