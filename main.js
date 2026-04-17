Game.registerMod('no-lucky', {
init: function () {

const RARE = [
'dragon harvest',
'dragonflight',
'click frenzy',
'cookie storm',
'chain cookie'
];

function rerollLucky(choice){
    if(choice === 'multiply cookies'){
        return RARE[Math.floor(Math.random()*RARE.length)];
    }
    return choice;
}

let originalPop = Game.shimmerTypes.golden.popFunc;

Game.shimmerTypes.golden.popFunc = function(me){

    // ---- COPIA DA FUNÇÃO ORIGINAL ATÉ A ESCOLHA ----
    var list=[];
    if (me.wrath>0) list.push('clot','multiply cookies','ruin cookies');
    else list.push('frenzy','multiply cookies');

    if (me.wrath>0 && Math.random()<0.3) list.push('blood frenzy','chain cookie','cookie storm');
    else if (Math.random()<0.03 && Game.cookiesEarned>=100000) list.push('chain cookie','cookie storm');

    if (Math.random()<0.1 && (Math.random()<0.05 || !Game.hasBuff('Dragonflight'))) list.push('click frenzy');

    if ((me.wrath==0 && Math.random()<0.15) || Math.random()<0.05){
        if (Math.random()<Game.auraMult('Reaper of Fields')) list.push('dragon harvest');
        if (Math.random()<Game.auraMult('Dragonflight')) list.push('dragonflight');
    }

    var choice = choose(list);

    if (me.force!=''){
        choice = me.force;
        me.force='';
    }

    // ⭐ AQUI ESTÁ A MÁGICA ⭐
    choice = rerollLucky(choice);

    // força o efeito escolhido manualmente
    me.force = choice;

    // chama a função original agora que forçamos o resultado
    return originalPop.call(this, me);
};

}
});