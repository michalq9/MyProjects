
function attachTripletEvent() {
    
  $('.col.triplet.value').click(function(event){
      $('#aainfo .aainfo input').val($(event.target).text()).trigger('change')
    });
}

  $('#calculatemRna').click(function(){
    
    AminoAcidTriplet = ['AAA','Lys','AAC','Asn','AAG','Lys','AAT','Asn','ACA','Thr','ACC','Thr','ACG','Thr','ACT','Thr','AGA','Arg','AGC','Ser','AGG','Arg','AGT','Ser','ATA','Ile','ATC','Ile','ATG','Met','ATT','Ile','CAA','Gln','CAC','His','CAG','Gln','CAT','His','CCA','Pro','CCC','Pro','CCG','Pro','CCT','Pro','CGA','Arg','CGC','Arg','CGG','Arg','CGT','Arg','CTA','Leu','CTC','Leu','CTG','Leu','CTT','Leu','GAA','Glu','GAC','Asp','GAG','Glu','GAT','Asp','GCA','Ala','GCC','Ala','GCG','Ala','GCT','Ala','GGA','Gly','GGC','Gly','GGG','Gly','GGT','Gly','GTA','Val','GTC','Val','GTG','Val','GTT','Val','TAA','Stp','TAC','Tyr','TAG','Stp','TAT','Tyr','TCA','Ser','TCC','Ser','TCG','Ser','TCT','Ser','TGA','Stp','TGC','Cys','TGG','Trp','TGT','Cys','TTA','Leu','TTC','Phe','TTG','Leu','TTT','Phe'];
    const DNA = $("#dnafield").val();
    const Swap = {'T':'A','A':'T','G':'C','C':'G', ' ': '', '  ':''};
    const Swap2 = {'T':'U'};
    
    mRNA = DNA.toUpperCase().replace(/[TAGC   ]/g, m => Swap[m]);
    mRNA1 = mRNA.replace(/T/g, 'U');
    x1 = 0;
    x2 = 3;
    Triplet = [30];
    for (i = 0; mRNA.length >= i; i++)
    {
        Triplet[i] = mRNA.substring(x1, x2);
        x1+=3;
        x2+=3;
    }
    var aminoAcid = '';
    for (i = 0; mRNA.length >= i; i++)
    {
        aminoS = (AminoAcidTriplet.findIndex((x) => x === Triplet[i]));
        if(aminoS>=0)
        {
            aminoAcid = aminoAcid + AminoAcidTriplet[aminoS+1];
        }
    }
    
    let mrnaControl = $('#mrna');
    mrnaControl.text(mRNA1);
    mrnaControl.show();

    let aminoAcidControl = $('#aminoAcid');
    aminoAcidControl.text(aminoAcid); 
    aminoAcidControl.show();
    
              console.log(mRNA + ' ' + mRNA.length);

    let mrnaArrayLength = Math.floor(mRNA.length/3);
    console.log(mrnaArrayLength);

    
    $('#tripletContainer').empty();
    for (i = 0; i < mrnaArrayLength; i++)
    {
    let row = '<div class="row"><div class="col">Triplet-{{id}}</div><div class="col triplet value" style="cursor: pointer">{{Value}}</div></div>';  
      let tripletI = mRNA.substring(i*3, (i*3)+3);
      row = row.replace('{{id}}', i+1);
      row = row.replace('{{Value}}', tripletI);
      $('#tripletContainer').append(row);
    }
    
    attachTripletEvent();    
    
  });


