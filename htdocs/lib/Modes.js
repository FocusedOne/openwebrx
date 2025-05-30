var Modes = {
    modes: [],
    features: {},
    panels: [],
    setModes:function(json){
        this.modes = json.map(function(m){ return new Mode(m); });
        this.updatePanels();
        var bookmarkDialog = $('#openwebrx-dialog-bookmark').bookmarkDialog();
        bookmarkDialog.setUnderlying(this.modes);
        bookmarkDialog.setModes(this.modes);
    },
    getModes:function(){
        return this.modes;
    },
    setFeatures:function(features){
        this.features = features;
        this.updatePanels();
    },
    findByModulation:function(modulation){
        matches = this.modes.filter(function(m) { return m.modulation === modulation; });
        if (matches.length) return matches[0]
    },
    registerModePanel: function(el) {
        this.panels.push(el);
    },
    initComplete: function() {
        return this.modes.length && Object.keys(this.features).length;
    },
    updatePanels: function() {
        this.panels.forEach(function(p) {
            p.render();
            p.startDemodulator();
        });
    }
};

var Mode = function(json){
    this.modulation = json.modulation;
    this.name = json.name;
    this.type = json.type;
    this.squelch = json.squelch;
    if (json.bandpass) {
        this.bandpass = json.bandpass;
    }
    if (json.ifRate) {
        this.ifRate = json.ifRate;
    }
    if (this.type === 'digimode') {
        this.underlying = json.underlying;
        this.secondaryFft = json.secondaryFft;
    }
};
