document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header) {
        console.error('No <header> element found to inject the navbar.');
        return;
    }

    const path = window.location.pathname;
    const relativePath = path.substring(path.lastIndexOf('/') + 1);
    
    // Determine the base path for links in a more robust way
    const projectDirName = 'Proyecto-QuickShop';
    const pathSegments = path.split('/');
    const projectRootIndex = pathSegments.indexOf(projectDirName);

    let depth = 0;
    if (projectRootIndex !== -1) {
        depth = pathSegments.length - projectRootIndex - 2;
    } else {
        // Fallback for cases where the project name isn't in the path
        depth = (path.match(/\//g) || []).length - 1;
    }
    depth = Math.max(0, depth); // Ensure depth is not negative

    const basePath = depth > 0 ? '../'.repeat(depth) : './';

    let navHTML = `
        <nav class="navbar">
            <h1>ClickShop</h1>
    `;

    // Common links
    navHTML += `
        <div>
            <a href="${basePath}index.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" /></svg>
                Inicio
            </a>
        </div>
    `;

    if (relativePath !== 'carrito.html') {
        navHTML += `
            <div>
                <a href="${basePath}carrito/carrito.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    Carrito
                </a>
            </div>
        `;
    }

    if (relativePath !== 'login.html' && relativePath !== 'configuracion.html' && relativePath !== 'agregar-producto.html' && relativePath !== 'editar-producto.html') {
        navHTML += `
            <div>
                <a href="${basePath}login/login.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4" /></svg>
                    Configuración
                </a>
            </div>
        `;
    }

    if (relativePath === 'configuracion.html') {
        navHTML += `
            <div>
                <button id="cerrarSesion">Cerrar Sesión</button>
            </div>
        `;
    }

    if (relativePath === 'agregar-producto.html' || relativePath === 'editar-producto.html') {
        navHTML += `
            <div>
                <a href="${basePath}configuración/configuracion.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    Atrás
                </a>
            </div>
        `;
    }

    navHTML += '</nav>';
    header.innerHTML = navHTML;
});
