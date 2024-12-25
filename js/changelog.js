document.addEventListener("DOMContentLoaded", () => {
    const changeLogContainer = document.querySelector("#changeLog");

    const changeLogData = [
        {
            version: "v1.0",
            date: "2024-12-24",
            changes: [
                "Launch of Bob Comparer"
				"v255 -- The Dark Ride available"
				"v256 -- The Dark Ride -- Limbo available"
            ]
        },
        {
            version: "",
            date: "",
            changes: [
                ""
            ]
        },
    ];

    changeLogData.forEach(log => {
        const logItem = document.createElement("li");
        logItem.className = "list-group-item";
        logItem.innerHTML = `
            <h6>${log.version} - ${log.date}</h6>
            <ul>
                ${log.changes.map(change => `<li>${change}</li>`).join("")}
            </ul>
        `;
        changeLogContainer.appendChild(logItem);
    });
});
