'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-tut documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' : 'data-bs-target="#xs-controllers-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' :
                                            'id="xs-controllers-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' : 'data-bs-target="#xs-injectables-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' :
                                        'id="xs-injectables-links-module-AppModule-fb60538d8db2caf9a607b32381ef1d0f39c7d5d9e57ca771eb4e3c8eeb2b70bfe33577f66c22faebf656c9c3be8238a618184e106b34ebf020b6000a1eccdc94"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' :
                                            'id="xs-controllers-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' :
                                        'id="xs-injectables-links-module-AuthModule-0cd0a29002376e8d3edeba1d4d6eb59280c39e91c5f9777acf3320e430eaf9c36a29fd686a1eb6f6e37fb8925bedb70ef56d10f31bc640bbcb72599931656b56"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' : 'data-bs-target="#xs-controllers-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' :
                                            'id="xs-controllers-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' : 'data-bs-target="#xs-injectables-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' :
                                        'id="xs-injectables-links-module-PostModule-2daa0b0fa7384c50ba329e2196a9ef81f7d2cab01f49e11377ae95f016327021d66952a5beb2d132ca6c3a1ab444440675b317c94a29f1a596d5c1454dab27f2"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' : 'data-bs-target="#xs-controllers-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' :
                                            'id="xs-controllers-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' : 'data-bs-target="#xs-injectables-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' :
                                        'id="xs-injectables-links-module-UserModule-b67cafa23ab92abe8ae8223e96d76c2363fd2389668c681e82589f38c6f640642ced7971d7108d9b4046cb4466f9dadfcca0fecd5611798b8afa0f55574a3d21"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});