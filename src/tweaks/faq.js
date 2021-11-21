window.addEventListener(`pageLoading`, () => {
	if (!window.location.href.includes(`/Family/FAQ`)) {
		return;
	}

	if (document.querySelector(`.faq-item.eval-notifications`) !== null) {
		document.querySelector(`.faq-item.eval-notifications .faq-item-content`).innerHTML = `
			<p>Šī funkcija ir pieejama tikai Ģimenes komplekta lietotājiem.</p>
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, tad nospied uz "Iestatījumi", tad "Ģimenes uzstādījumi".</p>
			<p>Vajadzētu parādīties sarakstam ar visiem kontiem Tavā ģimenē. Nospied uz savu kontu, un vajadzētu parādīties lodziņam.</p>
			<p>Lodziņā aizej uz sadaļu "Notifikācijas", un tur vari veikt visus uzstādījumus saistībā ar ziņojumiem.</p> 
		`;
	}
	if (document.querySelector(`.faq-item.int-mail`) !== null) {
		document.querySelector(`.faq-item.int-mail .faq-item-content`).innerHTML = `
			<p>Šī funkcija ir pieejama tikai Ģimenes komplekta lietotājiem.</p>
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, tad nospied uz "Iestatījumi", tad "Ģimenes uzstādījumi".</p>
			<p>Vajadzētu parādīties sarakstam ar visiem kontiem Tavā ģimenē. Nospied uz savu kontu, un vajadzētu parādīties lodziņam.</p>
			<p>Lodziņā aizej uz sadaļu "Notifikācijas", un tur vari veikt visus uzstādījumus saistībā ar ziņojumiem.</p> 
		`;
	}
	if (document.querySelector(`.faq-item.plan-extend`) !== null) {
		document.querySelector(`.faq-item.plan-extend .faq-item-content`).innerHTML = `
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, tad nospied uz "Ģimenes komplekts". Tad parādīsies jauna lapa ar pogu "Iegādāties" vai "Pagarināt".</p>
			<p>Ģimenes komplektu var iegādāties ar internetbankas starpniecību, maksājumu karti vai SMS. Ģimenes komplektu var iegādāties ar atlaidi, ja to pērk uzreiz līdz mācību gada beigām.</p>
		`;
	}
	if (document.querySelector(`.faq-item.plan-info`) !== null) {
		document.querySelector(`.faq-item.plan-info .faq-item-content`).innerHTML = `
			<p>Ģimenes komplekts ir E-klases maksas pakalpojums, kas paplašina E-klases funkcionalitāti. Tas nodrošina šādas priekšrocības:</p>
			<ul>
				<li>Jaunākās atzīmes un skolotāju ziņojumi E-klases sākumlapā</li>
				<li>SMS vai E-pasta paziņojumi</li>
				<li>Iespēja apvienot vienā lietotāja kontā visus savus bērnus un mācību iestādes, lai nav jāizmanto vairāki lietotāju konti un paroles</li>
				<li>Iespēja atslēgt reklāmas pašā E-klasē</li>
				<li>Piekļuve padziļinātai statistikai un dažādiem pārskatiem par mācību procesu</li>
			</ul>
		`;
	}
	if (document.querySelector(`.faq-item.role-info`) !== null) {
		document.querySelector(`.faq-item.role-info .faq-item-content`).innerHTML = `
			<p>Jā, ir.</p>
			<p>Ir ļoti ieteicams lietot savu kontu, jo vecākiem un skolēniem atšķiras E-klases funkcionalitāte.</p>
		`;
	}
	if (document.querySelector(`.faq-item.correct-role`) !== null) {
		document.querySelector(`.faq-item.correct-role .faq-item-content`).innerHTML = `
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, un izvēlnes augšā rādīsies Tavs vārds, kā arī loma.</p>
			<p>Loma var būt vai nu <i>skolēns</i>, <i>tētis</i> vai <i>mamma</i>.</p>
		`;
	}
	if (document.querySelector(`.faq-item.activitate-role`) !== null) {
		document.querySelector(`.faq-item.activitate-role .faq-item-content`).innerHTML = `
			<p>Lietotāja loma ir atkarīga no izmantotās paroles. Katram lietotājam ir sava parole.</p>
			<p>Lai iegūtu nepieciešamo paroli, no sava telefona sūti SMS ar tekstu </i>ek xxxxxx-xxxxx</i> uz numuru 1800 (<i>xxxxxx-xxxxx</i> raksti savu personas kodu).</p>
			<p>Ja Tev neizdodas saņemt SMS ar paroli, sazinies ar klases audzinātāju un palūdz, lai Tev izsniedz jaunu paroli.</p>
		`;
	}
	if (document.querySelector(`.faq-item.school-invisible`) !== null) {
		document.querySelector(`.faq-item.school-invisible .faq-item-content`).innerHTML = `
			<p>Sazinies ar klases audzinātāju un palūdz, lai ievada Tavu telefona numuru E-klasē. Līdz ko audzinātājs E-klasē reģistrēs telefona numuru, uz to atnāks SMS ar paroli.</p>
			<p>Lietotājvārds būs tas pats.</p>
		`;
	}
	if (document.querySelector(`.faq-item.ivalid-data`) !== null) {
		document.querySelector(`.faq-item.ivalid-data .faq-item-content`).innerHTML = `
			<p>Lai izlabotu nepareizus datus, sazinies ar klases audzinātāju un palūdz, lai viņš veic labojumus vai ievada trūkstošo informāciju.</p>
		`;
	}
	if (document.querySelector(`.faq-item.change-user-name`) !== null) {
		document.querySelector(`.faq-item.change-user-name .faq-item-content`).innerHTML = `
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, tad nospied uz "Iestatījumi", tad "Ģimenes uzstādījumi".</p>
			<p>Vajadzētu parādīties sarakstam ar visiem kontiem Tavā ģimenē. Nospied uz savu kontu, un vajadzētu parādīties lodziņam.</p>
			<p>Šajā lodziņā ir iespēja nomainīt savu lietotājvārdu uz kādu sev tīkamāku.</p>
		`;
	}
	if (document.querySelector(`.faq-item.change-pw`) !== null) {
		document.querySelector(`.faq-item.change-pw .faq-item-content`).innerHTML = `
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, tad nospied uz "Iestatījumi", tad "Ģimenes uzstādījumi".</p>
			<p>Vajadzētu parādīties sarakstam ar visiem kontiem Tavā ģimenē. Nospied uz savu kontu, un vajadzētu parādīties lodziņam.</p>
			<p>Lodziņā aizej uz sadaļu "Parole", un tur Tu vari nomainīt savu paroli.</p>
		`;
	}
	if (document.querySelector(`.faq-item.mail-confidential`) !== null) {
		document.querySelector(`.faq-item.mail-confidential .faq-item-content`).innerHTML = `
			<p>E-klases pasts ir tik konfidenciāls, cik Tava parole. Glabā to atbildīgi, pārliecinies, ka tā ir diezgan sarežģīta, un, atrodoties pie publiska datora, vienmēr atceries iziet no E-klases pēc darba beigšanas.</p>
		`;
	}
	if (document.querySelector(`.faq-item.lesson-times`) !== null) {
		document.querySelector(`.faq-item.lesson-times .faq-item-content`).innerHTML = `
			<p>E-klases Dienasgrāmatā ir poga "Stundu laiki". To nospiežot var redzēt stundu laikus.</p>
			<p>Izmantojot E-klases Palīgu, apzīmējumu skaidrojumi diemžēl pašlaik nav vēl pieejami, taču tuvākajā nākotnē šī funkcija tiks pievienota.</p>
		`;
	}
	if (document.querySelector(`.faq-item.hide-adv`) !== null) {
		document.querySelector(`.faq-item.hide-adv .faq-item-content`).innerHTML = `
			<p>Šī funkcija ir pieejama tikai Ģimenes komplekta lietotājiem.</p>
			<p>Atver sava konta izvēlni, nospiežot uz ikonu augšējā labajā stūrī, tad nospied uz "Iestatījumi", tad "Ģimenes uzstādījumi".</p>
			<p>Vajadzētu parādīties sarakstam ar visiem kontiem Tavā ģimenē. Nospied uz savu kontu, un vajadzētu parādīties lodziņam.</p>
			<p>Lodziņa apakšā būs izvēle atslēgt reklāmu rādīšanu.</p>
		`;
	}
	if (document.querySelector(`.faq-item.help`) !== null) {
		document.querySelector(`.faq-item.help .faq-item-content`).innerHTML = `
			<p>Ja jautājums ir par mācību darba organizāciju (atzīmēm, kavējumiem, stundām u.c.), sūti vēstuli klases audzinātājam vai priekšmeta skolotājam E-klases pastā.</p>
			<p>Ja jautājums ir par E-klases sistēmas darbību, aizpildi Tehniskā atbalsta <a href="/Family/TechnicalSupport">saziņas formu</a>.</p>
		`;
	}
	if (document.querySelector(`.faq-item.app`) !== null) {
		document.querySelector(`.faq-item.app .faq-item-content`).innerHTML = `
			<p>E-klasei ir pieejama aplikācija gan uz Android, gan Apple ierīcēm - gan telefoniem, gan planšetdatoriem.</p>
			<p>E-klases Palīgu diemžēl nav iespējams izmantot aplikācijās.</p>
		`;
	}
});