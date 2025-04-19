async function fetchWithRetryAndTimeout(url, options = {}, retries = 3, delay = 2000, timeout = 8000) {
    for (let i = 0; i < retries; i++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res;
      } catch (err) {
        clearTimeout(timer);
        console.warn(`Retry ${i + 1}/${retries} failed for ${url}:`, err);
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  
  function setupCollapsibles() {
    document.querySelectorAll(".collapsible-header").forEach(header => {
      const toggleBtn = header.querySelector(".toggle-btn");
      const content = header.nextElementSibling;
  
      toggleBtn.addEventListener("click", () => {
        const isVisible = content.style.display === "block";
        content.style.display = isVisible ? "none" : "block";
        toggleBtn.textContent = isVisible ? "[+ Expand]" : "[– Collapse]";
      });
  
      // Set initial collapsed state
      content.style.display = "none";
      toggleBtn.textContent = "[+ Expand]";
    });
  }
  
  setupCollapsibles();

  function toggleSection(headerEl) {
    const wrapper = headerEl.nextElementSibling;
    const toggle = headerEl.querySelector('.section-toggle');
    const isOpen = wrapper.classList.toggle('open');
    toggle.textContent = isOpen ? '[–]' : '[+]';
  }
  
  const ugcToCounty = {
    "OHC001": "Adams", "OHC003": "Allen", "OHC005": "Ashland", "OHC007": "Ashtabula",
    "OHC009": "Athens", "OHC011": "Auglaize", "OHC013": "Belmont", "OHC015": "Brown",
    "OHC017": "Butler", "OHC019": "Carroll", "OHC021": "Champaign", "OHC023": "Clark",
    "OHC025": "Clermont", "OHC027": "Clinton", "OHC029": "Columbiana", "OHC031": "Coshocton",
    "OHC033": "Crawford", "OHC035": "Cuyahoga", "OHC037": "Darke", "OHC039": "Defiance",
    "OHC041": "Delaware", "OHC043": "Erie", "OHC045": "Fairfield", "OHC047": "Fayette",
    "OHC049": "Franklin", "OHC051": "Fulton", "OHC053": "Gallia", "OHC055": "Geauga",
    "OHC057": "Greene", "OHC059": "Guernsey", "OHC061": "Hamilton", "OHC063": "Hancock",
    "OHC065": "Hardin", "OHC067": "Harrison", "OHC069": "Henry", "OHC071": "Highland",
    "OHC073": "Hocking", "OHC075": "Holmes", "OHC077": "Huron", "OHC079": "Jackson",
    "OHC081": "Jefferson", "OHC083": "Knox", "OHC085": "Lake", "OHC087": "Lawrence",
    "OHC089": "Licking", "OHC091": "Logan", "OHC093": "Lorain", "OHC095": "Lucas",
    "OHC097": "Madison", "OHC099": "Mahoning", "OHC101": "Marion", "OHC103": "Medina",
    "OHC105": "Meigs", "OHC107": "Mercer", "OHC109": "Miami", "OHC111": "Monroe",
    "OHC113": "Montgomery", "OHC115": "Morgan", "OHC117": "Morrow", "OHC119": "Muskingum",
    "OHC121": "Noble", "OHC123": "Ottawa", "OHC125": "Paulding", "OHC127": "Perry",
    "OHC129": "Pickaway", "OHC131": "Pike", "OHC133": "Portage", "OHC135": "Preble",
    "OHC137": "Putnam", "OHC139": "Richland", "OHC141": "Ross", "OHC143": "Sandusky",
    "OHC145": "Scioto", "OHC147": "Seneca", "OHC149": "Shelby", "OHC151": "Stark",
    "OHC153": "Summit", "OHC155": "Trumbull", "OHC157": "Tuscarawas", "OHC159": "Union",
    "OHC161": "Van Wert", "OHC163": "Vinton", "OHC165": "Warren", "OHC167": "Washington",
    "OHC169": "Wayne", "OHC171": "Williams", "OHC173": "Wood", "OHC175": "Wyandot"
  };
  
  const stationNames = {
    "DAY": "Dayton",
    "BJJ": "Wooster",
    "SGH": "Springfield",
    "I69": "Batavia",
    "S24": "Fremont",
    "I67": "Harrison",
    "GDK": "Dayton",
    "10G": "Millersburg",
    "CDI": "Cambridge",
    "OWX": "Ottawa",
    "I23": "Washington Court House",
    "FFO": "Wright Patterson",
    "I68": "Lebanon",
    "OXD": "Oxford",
    "I74": "Urbana",
    "POV": "Ravenna",
    "LNN": "Willoughby",
    "RZT": "Chillicothe",
    "I95": "Kenton",
    "JRO": "Jackson",
    "UYF": "London",
    "LCK": "Rickenbacker ANG",
    "VNW": "Van Wert County",
    "AXV": "Wapakoneta",
    "MWO": "Middletown",
    "UNI": "Albany",
    "ILN": "Wilmington",
    "AKR": "Akron",
    "VTA": "Newark",
    "FDY": "Findlay",
    "BKL": "Cleveland Burke",
    "OSU": "Columbus OSU",
    "MNN": "Marion",
    "MGY": "Dayton",
    "ZZV": "Zanesville",
    "TDZ": "Toledo",
    "AOH": "Lima",
    "PHD": "New Philadelphia",
    "HZY": "Ashtabula",
    "DFI": "Defiance",
    "LPR": "Lorain/Elyria",
    "HAO": "Hamilton",
    "LUK": "Cincinnati Lunken",
    "LHQ": "Lancaster",
    "MFD": "Mansfield",
    "TOL": "Toledo",
    "CAK": "Akron/Canton",
    "CMH": "Columbus",
    "YNG": "Youngstown",
    "CLE": "Cleveland",
    "TZR": "Bolton Field",
    "CGF": "Cuyahoga County",
    "4I3": "Mount Vernon",
    "MRT": "Marysville",
    "I40": "Coshocton",
    "USE": "Wauseon",
    "PCW": "Port Clinton",
    "2G2": "Steubenville",
    "VES": "Versailles",
    "DLZ": "Delaware",
    "PMH": "Portsmouth",
    "EDJ": "Bellefontaine"
  };
  
  function formatCountyList(counties) {
    if (!counties.length) return "some counties";
    if (counties.length === 1) return counties[0] + " County";
    const last = counties.pop();
    return counties.join(", ") + ", and " + last + " Counties";
  }
      const ALERT_TYPES = ["Tornado Warning", "Severe Thunderstorm Warning", "Flash Flood Warning"];
      const announced = new Set();
      const tone = document.getElementById("alertTone");
      const toneSlider = document.getElementById("toneVolumeSlider");
      const voiceSlider = document.getElementById("voiceVolumeSlider");
      const muteTone = document.getElementById("muteTone");
      const muteVoice = document.getElementById("muteVoice");
      const readTornado = document.getElementById("readTornado");
      const readSevere = document.getElementById("readSevere");
      const readFlashFlood = document.getElementById("readFlashFlood");
  
      toneSlider.addEventListener("input", () => {
        tone.volume = parseFloat(toneSlider.value);
      });
  
      function playTestTone() {
        tone.volume = parseFloat(toneSlider.value);
        tone.currentTime = 0;
        tone.play().catch(e => console.warn("Tone play blocked:", e));
      }
  
      let preferredVoice = null;
      let voicesReady = false;
  
      function loadVoices() {
        const voices = speechSynthesis.getVoices();
        preferredVoice = voices.find(v => v.name === "Google US English")
                  || voices.find(v => v.name.includes("Microsoft Aria Online"))
                  || voices.find(v => v.name === "Google UK English Male")
                  || voices.find(v => v.name.includes("Google") && v.lang === "en-US")
                  || voices.find(v => v.name.includes("Google"))
                  || voices.find(v => v.name.includes("Microsoft Zira"))
                  || voices.find(v => v.name.includes("Microsoft Mark"))
                  || voices.find(v => v.name.includes("Microsoft David"))
                  || voices[0];
  
        voicesReady = !!preferredVoice;
        console.log("🗣 Using voice:", preferredVoice?.name || "None found");
      }
  
      function generateSpeech(message) {
        if (!voicesReady) {
          console.warn("⚠️ Voices not loaded yet — skipping speech");
          return;
        }
        const utter = new SpeechSynthesisUtterance(message);
        utter.voice = preferredVoice;
        utter.volume = parseFloat(voiceSlider.value);
        utter.rate = 0.95;
        utter.pitch = 1;
        console.log("🔊 Speaking with:", utter.voice?.name);
        speechSynthesis.speak(utter);
      }
  
      function formatCountyList(counties) {
    if (counties.length === 1) return counties[0] + " County";
    const last = counties.pop();
    return counties.join(", ") + ", and " + last + " Counties";
  }
  
  async function fetchOhioAlerts(isManual = false, typeOverride = "Tornado Warning") {
        const now = new Date().toLocaleTimeString();
        document.getElementById("lastChecked").textContent = now;
  
        try {
          let data;
          if (isManual) {
            data = {
    features: [{
      id: "test-" + Date.now(),
      properties: {
        event: typeOverride,
        areaDesc: "Greene, OH, Clark, OH",
        geocode: {
          UGC: ["OHC057", "OHC023"]
        },
        ends: new Date(Date.now() + 30 * 60000).toISOString(),
        sent: new Date().toISOString(),
        messageType: "Alert"
      }
    }]
  };
          } else {
            const res = await fetchWithRetryAndTimeout("https://api.weather.gov/alerts/active?area=OH");
            data = await res.json();
          }
  
          const alerts = data.features.filter(feature =>
            ALERT_TYPES.includes(feature.properties.event)
          );
  
          const counts = {
    "Tornado Warning": 0,
    "Severe Thunderstorm Warning": 0,
    "Flash Flood Warning": 0
  };
  
          const activeAlerts = document.getElementById("activeAlerts");
          activeAlerts.innerHTML = "";
  
          let speechQueue = [];
  
          for (const alert of alerts) {
    const { event: type, ends, sent, geocode, messageType } = alert.properties;
    const id = alert.id;
    const issuedTime = new Date(sent);
    const until = new Date(ends).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  
    // Only handle Tornado or Thunderstorm Warnings
    if (!ALERT_TYPES.includes(type)) continue;
  
    // Get Ohio-specific UGC codes
    const ugcList = geocode?.UGC || [];
    const ohioUgc = ugcList.filter(code => code.startsWith("OHC"));
  
    // Skip alert if no Ohio counties are affected
    if (ohioUgc.length === 0) continue;
  
    // Use real county names
    const formattedCounties = formatCountyList(
    ohioUgc.map(code => ugcToCounty[code]).filter(Boolean)
  );
  
    const message = `A new ${type} has been issued for ${formattedCounties} in Ohio until ${until}.`;
  
    // Add to count
    counts[type]++;
  
    // Display in list
    const li = document.createElement("li");
    li.textContent = `${type} for ${formattedCounties} – expires at ${until}`;
    if (type === "Tornado Warning") {
    li.classList.add("tornado");
  } else if (type === "Severe Thunderstorm Warning") {
    li.classList.add("thunderstorm");
  } else if (type === "Flash Flood Warning") {
    li.classList.add("flashflood");
  }
    activeAlerts.appendChild(li);
  
    // Only read if it's a newly issued alert (not updated)
    const isNew = (Date.now() - issuedTime.getTime()) < 2 * 60 * 1000 && messageType === "Alert";
  
    if (isNew && !announced.has(id)) {
      announced.add(id);
      speechQueue.push({ id, type, message });
    } else {
      announced.add(id); // Still mark it as seen to prevent repeat speech
    }
  }
  
          const warningCountElement = document.getElementById("warningCount");
          warningCountElement.innerHTML = `
            <span class="tornado">🌪 Tornado Warnings: ${counts["Tornado Warning"]}</span> &nbsp;&nbsp;
            <span class="thunderstorm">🌩 Severe Thunderstorm Warnings: ${counts["Severe Thunderstorm Warning"]}</span>
            <span class="flashflood">🌊 Flash Flood Warnings: ${counts["Flash Flood Warning"] || 0}</span>
          `;
  
          if (alerts.length === 0) {
            activeAlerts.innerHTML = "<li>No active warnings</li>";
          }
  
          if (speechQueue.length > 0) {
          const tornado = speechQueue.find(a => a.type === "Tornado Warning");
          const storm = speechQueue.find(a => a.type === "Severe Thunderstorm Warning");
          const flood = speechQueue.find(a => a.type === "Flash Flood Warning");
          const toAnnounce = tornado || storm || flood;
          triggerAlertSequence(toAnnounce.message, toAnnounce.type); // <-- FIXED HERE
          updateStatus(toAnnounce.message);
  }
        } catch (err) {
          console.error("Error fetching alerts:", err);
          updateStatus("❌ Error fetching alerts: " + err.message, true);
        }
      }
  
      function triggerAlertSequence(message, type) {
    const shouldRead = (
      (type === "Tornado Warning" && readTornado.checked) ||
      (type === "Severe Thunderstorm Warning" && readSevere.checked) ||
      (type === "Flash Flood Warning" && readFlashFlood.checked)
    );
  
    if (!shouldRead) return;
  
    if (!muteTone.checked) {
      tone.volume = parseFloat(toneSlider.value);
      tone.currentTime = 0;
      tone.play();
    }
    setTimeout(() => {
      if (!muteVoice.checked) {
        generateSpeech("Alert. " + message);
      }
    }, 1000);
  }
  async function fetchOhioMDs() {
        const list = document.getElementById('ohioMDs');
        list.innerHTML = '<li>Loading...</li>';
  
        try {
          const res = await fetchWithRetryAndTimeout("https://www.spc.noaa.gov/products/spcmdrss.xml");
          const text = await res.text();
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, "application/xml");
  
          const items = Array.from(xml.querySelectorAll("item"));
          const ohioItems = items.filter(item => {
            const title = item.querySelector("title")?.textContent || "";
            const desc = item.querySelector("description")?.textContent || "";
            return title.includes("OH") || desc.includes("OH") || desc.includes("Ohio") || title.includes("Ohio");
          });
  
          if (ohioItems.length === 0) {
            list.innerHTML = '<li>No mesoscale discussions currently involving Ohio.</li>';
            return;
          }
  
          list.innerHTML = "";
          ohioItems.forEach(item => {
            const title = item.querySelector("title")?.textContent || "SPC MD";
            const link = item.querySelector("link")?.textContent || "#";
            const desc = item.querySelector("description")?.textContent || "";
            const pubDate = item.querySelector("pubDate")?.textContent;
            const issueTime = pubDate ? new Date(pubDate).toLocaleString("en-US", {
              timeZone: "America/New_York",
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              month: "short",
              day: "numeric"
            }) : "";
  
            const probMatch = desc.match(/Probability of Watch Issuance\.*?(\d+\s*percent)/i);
            const probability = probMatch ? probMatch[1] : "N/A";
  
            const mdMatch = link.match(/(\d{4})\.html$/);
            const mdNumber = mdMatch ? mdMatch[1] : null;
            const imageUrl = mdNumber ? `https://www.spc.noaa.gov/products/md/mcd${mdNumber}_full.png` : null;
  
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link;
            a.textContent = `${title} (${issueTime}, Watch Probability: ${probability})`;
            a.className = "md-title";
            a.target = "_blank";
            li.appendChild(a);
  
            if (imageUrl) {
              const toggle = document.createElement("span");
              toggle.textContent = "[+ Show Map]";
              toggle.className = "md-toggle";
              const img = document.createElement("img");
              img.src = imageUrl;
              img.alt = `MD ${mdNumber} Image`;
              img.className = "md-image";
  
              toggle.addEventListener("click", () => {
                const showing = img.style.display === "block";
                img.style.display = showing ? "none" : "block";
                toggle.textContent = showing ? "[+ Show Map]" : "[– Hide Map]";
              });
  
              li.appendChild(toggle);
              li.appendChild(img);
            }
  
            list.appendChild(li);
          });
        } catch (err) {
          console.error("Error loading MDs:", err);
          list.innerHTML = `<li>Error loading mesoscale discussions</li>`;
        }
      }
  
      fetchOhioMDs();
      setInterval(fetchOhioMDs, 2 * 60 * 1000);
  
  async function fetchGusts() {
    const tableBody = document.querySelector("#asosTable tbody");
    tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";
  
    try {
      const now = new Date();
      const start = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
  
      const year1 = start.getUTCFullYear();
      const month1 = start.getUTCMonth() + 1;
      const day1 = start.getUTCDate();
      const hour1 = start.getUTCHours();
      const minute1 = start.getUTCMinutes();
  
      const year2 = now.getUTCFullYear();
      const month2 = now.getUTCMonth() + 1;
      const day2 = now.getUTCDate();
      const hour2 = now.getUTCHours();
      const minute2 = now.getUTCMinutes();
  
      const url = `https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py?` +
        `network=OH_ASOS&data=gust&format=comma&tz=Etc/UTC&` +
        `year1=${year1}&month1=${month1}&day1=${day1}&hour1=${hour1}&minute1=${minute1}&` +
        `year2=${year2}&month2=${month2}&day2=${day2}&hour2=${hour2}&minute2=${minute2}`;
  
      const res = await fetchWithRetryAndTimeout(url);
      const text = await res.text();
  
      // Process CSV response
      const lines = text.trim().split("\n").filter(l => l && !l.startsWith("#"));
      if (lines.length < 2) {
        tableBody.innerHTML = "<tr><td colspan='4'>No gusts reported</td></tr>";
        return;
      }
  
      const headers = lines[0].split(",");
      const rows = lines.slice(1).map(line => line.split(","));
  
      const gustIndex = headers.indexOf("gust");
      const stationIndex = headers.indexOf("station");
      const timeIndex = headers.indexOf("valid");
  
      const gusts = rows
        .map(row => ({
          station: row[stationIndex],
          gust: parseFloat(row[gustIndex]),
          time: row[timeIndex]
        }))
        .filter(r => !isNaN(r.gust))
        .sort((a, b) => b.gust - a.gust)
        .slice(0, 10);
  
      if (gusts.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No gusts reported</td></tr>";
        return;
      }
  
      tableBody.innerHTML = "";
      gusts.forEach(({ station, gust, time }) => {
        const formattedTime = new Date(time + "Z").toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
  
        const city = stationNames[station] || station;
  
        const gustClass = gust >= 46 ? "gust-advisory":
                    gust >= 70 ? "gust-significant" :
                    gust >= 58 ? "gust-severe" : "";
  
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${city}</td>
          <td>${station}</td>
          <td class="${gustClass}">${gust} mph</td>
          <td>${formattedTime}</td>
        `;
        tableBody.appendChild(tr);
      });
  
    } catch (err) {
      console.error("Error loading ASOS gusts:", err);
      tableBody.innerHTML = `<tr><td colspan="4">Error loading gust data</td></tr>`;
    }
  }
  fetchGusts();
  setInterval(fetchGusts, 2 * 60 * 1000);
  
  async function fetchLSRs() {
    const tableBody = document.querySelector("#lsrTable tbody");
    tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";
  
    try {
      const res = await fetchWithRetryAndTimeout("https://mesonet.agron.iastate.edu/geojson/lsr.geojson?states=OH&hours=24");
      const data = await res.json();
      const reports = data.features;
  
      if (reports.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No reports</td></tr>";
        return;
      }
  
      // Sort reports by time descending
      reports.sort((a, b) => new Date(b.properties.valid) - new Date(a.properties.valid));
  
      tableBody.innerHTML = "";
  
      for (const report of reports) {
        const { valid, typetext, city, magnitude, unit, county, remark } = report.properties;
        const time = new Date(valid).toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          month: "short",
          day: "numeric"
        });
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${time}</td>
          <td>${typetext}</td>
          <td>${magnitude + unit}</td>
          <td>${city || "—"}</td>
          <td>${county || "—"}</td>
          <td>${remark || "—"}</td>
        `;
        tableBody.appendChild(row);
      }
    } catch (err) {
      console.error("Error fetching LSRs:", err);
      tableBody.innerHTML = `<tr><td colspan="5">Error loading reports</td></tr>`;
    }
  }
  
      function updateStatus(message, isError = false) {
        document.getElementById("lastAlert").textContent = message;
        const logEntry = document.createElement("div");
        logEntry.textContent = (isError ? "[ERROR] " : "[ALERT] ") + message;
        document.getElementById("log").prepend(logEntry);
      }
  
      function simulateTestWarning() {
    const selectedType = document.getElementById("testType").value;
    fetchOhioAlerts(true, selectedType);
  }
  
      function startAlertLoop() {
        fetchOhioAlerts(false);
        setInterval(() => fetchOhioAlerts(false), 5000);
      }
  
  
      fetchLSRs();
      setInterval(fetchLSRs, 2 * 60 * 1000); // Refresh every 5 minutes
  
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          loadVoices();
          startAlertLoop();
        };
      } else {
        loadVoices();
        startAlertLoop();
      }
