$(document).ready(function () {
    // Dados das categorias para gerar abas dinamicamente
    const categories = [
        { id: "all", label: "All" },
        { id: "new", label: "New" },
        { id: "modified", label: "Modified" },
        { id: "removed", label: "Removed" },
    ];

    // Criação dinâmica das abas
    const tabsContainer = $("#tabs");
    const tabContentContainer = $("#tabContent");

    categories.forEach((category, index) => {
        // Cria a aba
        tabsContainer.append(`
            <li class="nav-item">
                <a class="nav-link ${index === 0 ? "active" : ""}" data-bs-toggle="tab" href="#${category.id}">
                    ${category.label}
                </a>
            </li>
        `);

        // Cria o container do conteúdo da aba
        tabContentContainer.append(`
            <div id="${category.id}" class="tab-pane fade ${index === 0 ? "show active" : ""}">
                <div class="row g-3" id="${category.id}-row"></div>
            </div>
        `);
    });

    // Função para capitalizar palavras
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Função para criar o conteúdo das cartas
    function createCard(item, category) {
        let badge = "";
        if (category === "new") badge = `<span class="badge bg-primary mb-2">New</span>`;
        else if (category === "modified") badge = `<span class="badge bg-warning mb-2">Modified</span>`;
        else if (category === "removed") badge = `<span class="badge bg-danger mb-2">Removed</span>`;

        return `
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.name || item.new_achievement?.name || "Unknown Achievement"}</h5>
                        ${badge}
                        <p class="text-muted">
                            ${item.mainCategory || item.new_achievement?.mainCategory || "Uncategorized"} - 
                            ${item.subCategory || item.new_achievement?.subCategory || "General"}
                        </p>
                        <p>${item.desc || item.new_achievement?.desc || "No description available."}</p>
                        <p class="text-secondary">
                            Mission: ${item.mission_name || item.new_achievement?.mission_name || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // Carrega o JSON
    $.getJSON("data/items.json", function (data) {
        const allAchievements = $("#all-row");
        const newAchievements = $("#new-row");
        const modifiedAchievements = $("#modified-row");
        const removedAchievements = $("#removed-row");

        data.forEach(function (item) {
            if (item.new_achievement) {
                const cardHtml = createCard(item.new_achievement, "new");
                newAchievements.append(cardHtml);
                allAchievements.append(cardHtml);
            } else if (item.removed_achievement) {
                const cardHtml = createCard(item.removed_achievement, "removed");
                removedAchievements.append(cardHtml);
                allAchievements.append(cardHtml);
            } else if (item.differences) {
                const cardHtml = createCard(item, "modified");
                modifiedAchievements.append(cardHtml);
                allAchievements.append(cardHtml);
            }
        });
    });
});
