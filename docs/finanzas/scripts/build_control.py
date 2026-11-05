import datetime as dt
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.formatting.rule import FormulaRule
OUT='/home/user/Proyecto/docs/finanzas/OELNOR-control-financiero.xlsx'
F='Arial'
BLACKF=PatternFill('solid',fgColor='000000'); BEIGE=PatternFill('solid',fgColor='E8DCC8'); LIGHT=PatternFill('solid',fgColor='F7F2EA')
BLUEF=PatternFill('solid',fgColor='C5E3F2'); WHITE=PatternFill('solid',fgColor='FFFFFF')
RED=PatternFill('solid',fgColor='F4C7C3'); GREEN=PatternFill('solid',fgColor='D4EDDA')
s=Side(style='thin',color='BFBFBF'); B=Border(top=s,bottom=s,left=s,right=s)
EUR='#,##0.00 €;-#,##0.00 €;"-"'; ROASF='0.00"x"'; PCT='0.0%;-0.0%;"-"'; DATE='dd/mm/yyyy'
C=Alignment(horizontal='center',vertical='center',wrap_text=True)
MESES=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
CORTO=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
NROWS=40; FIRST=6; LAST=FIRST+NROWS-1
COLS=['Fecha','Test / Producto','Pedidos','Precio / Ingresos (€)','Impuesto Shopify (€)','Coste proveedor (€)','Meta Ads (€)','Beneficio neto (€)','ROAS','Notas']
W=[13,30,10,17,16,17,14,17,10,44]
d=dt.date
# (fecha, test, pedidos, ingresos, coste, meta, nota)
DATA={
(2026,9):[
 (d(2026,9,17),'INTERACCIÓN (página)',0,0,0,3.74,''),
 (d(2026,9,18),'CAMPAÑA 1 BOLSO',0,0,0,6.03,''),
 (d(2026,9,20),'BOLSO SIENA',2,69.98,None,107.14,'Pedidos #10020 y #10030. Falta coste proveedor'),
 (d(2026,9,20),'Pedido sin test (portalabial + bolsa)',1,28.98,None,0,'Pedido #10010. Falta coste proveedor'),
 (d(2026,9,21),'CHAQUETA IMPERMEABLE EIRA',0,0,0,18.72,''),
 (d(2026,9,24),'CALENTAR CAMPAÑA OTOÑO',0,0,0,10.89,'Tráfico'),
 (d(2026,9,25),'CAMPAÑA OTOÑO',0,0,0,22.52,''),
 (d(2026,9,26),'TRÁFICO 1',0,0,0,23.51,'Tráfico'),
 (d(2026,9,29),'CHAQUETA FLECOS KAIA',0,0,0,24.27,''),
 (d(2026,9,30),'Pedido sin test (Neri)',1,34.99,None,0,'Pedido #10040. Falta coste proveedor'),
],
(2026,10):[
 (d(2026,10,1),'BOMBER NOA',1,43.75,16.16,31.70,''),
 (d(2026,10,2),'Q4',0,0,0,6.73,''),
 (d(2026,10,3),'CAMPAÑA PORTALABIAL',0,0,0,13.84,''),
 (d(2026,10,3),'BOTAS SORA',2,107.80,55.12,72.36,''),
 (d(2026,10,4),'CHAQUETA LENA',0,0,0,28.76,''),
 (d(2026,10,6),'CAMPAÑA TRÁFICO',0,0,0,16.04,''),
 (d(2026,10,7),'BOLSO ARIA',0,0,0,25.57,''),
 (d(2026,10,8),'RETEST BOTAS',0,0,0,25.78,''),
 (d(2026,10,10),'JEANS STELLA',2,92.39,38.02,103.95,''),
 (d(2026,10,15),'CHAQUETA MAVI',0,0,0,31.45,''),
 (d(2026,10,17),'BOLSO RONA',0,0,0,16.17,''),
 (d(2026,10,18),'MALLAS TÉRMICAS',4,94.97,41.52,77.34,''),
],
(2026,11):[
 (d(2026,10,30),'BOTINES LARA',2,209.85,55.64,95.12,'30/10–02/11, cerrada sin 3.er pedido. #10160 (2 pares) y #10170 (1 par). Proveedor 55,64 € (incluye 5 €/pedido). #10180 cancelado: no cuenta'),
(d(2026,11,5),'ABRIGO IRENE',1,104.94,32.62,9.01,'EN CURSO desde 05/11 8:00. #10200 (abrigo negro L + medias M-L). Proveedor 32,62 € (abrigo 19,49 + medias 8,13 + 5 €/pedido). Meta: gasto a 05/11 14:40, actualizar en cada revisión'),
],
}
wb=Workbook(); res=wb.active; res.title='RESUMEN'
def title(ws,text,ncol):
    ws.merge_cells(start_row=1,start_column=1,end_row=1,end_column=ncol)
    c=ws.cell(row=1,column=1,value=text); c.font=Font(name=F,bold=True,size=16,color='FFFFFF'); c.alignment=C
    for i in range(1,ncol+1): ws.cell(row=1,column=i).fill=BLACKF
    ws.row_dimensions[1].height=34
def kpis(ws,labels,formulas,fmts,row=3):
    for i,(l,f,fm) in enumerate(zip(labels,formulas,fmts),1):
        a=ws.cell(row=row,column=i,value=l); a.font=Font(name=F,bold=True,size=9); a.fill=BEIGE; a.alignment=C; a.border=B
        b=ws.cell(row=row+1,column=i,value=f); b.font=Font(name=F,bold=True,size=12); b.fill=LIGHT; b.alignment=C; b.border=B; b.number_format=fm
    ws.row_dimensions[row].height=28; ws.row_dimensions[row+1].height=26
def header(ws,cols,row):
    for i,cn in enumerate(cols,1):
        c=ws.cell(row=row,column=i,value=cn); c.font=Font(name=F,bold=True,color='FFFFFF'); c.fill=BLACKF; c.alignment=C; c.border=B
    ws.row_dimensions[row].height=30
def benef_cf(ws,rng):
    col=rng.split(':')[0][0]; r0=''.join(ch for ch in rng.split(':')[0] if ch.isdigit())
    ws.conditional_formatting.add(rng,FormulaRule(formula=[f'AND(ISNUMBER({col}{r0}),{col}{r0}<0)'],fill=RED,font=Font(name=F,bold=True,color='9C0006')))
    ws.conditional_formatting.add(rng,FormulaRule(formula=[f'AND(ISNUMBER({col}{r0}),{col}{r0}>0)'],fill=GREEN,font=Font(name=F,bold=True,color='006100')))

months=[(2026+(8+i)//12,(8+i)%12+1) for i in range(16)]  # Sep 2026 - Dic 2027
names=[]
for (y,m) in months:
    name=f'{CORTO[m-1]} {y}'; names.append(name)
    ws=wb.create_sheet(name)
    for i,w in enumerate(W,1): ws.column_dimensions[chr(64+i)].width=w
    title(ws,f'OELNOR · CONTROL SIMPLE · {MESES[m-1]} {y}',10)
    R=lambda col:f'{col}{FIRST}:{col}{LAST}'
    kpis(ws,['Total tests','Total pedidos','Ingresos','Impuesto Shopify','Proveedor','Meta Ads','Beneficio neto','Margen','ROAS total'],
         [f'=COUNTA({R("B")})',f'=SUM({R("C")})',f'=SUM({R("D")})',f'=SUM({R("E")})',f'=SUM({R("F")})',f'=SUM({R("G")})',
          '=C4-D4-E4-F4','=IF(C4=0,"",G4/C4)','=IF(F4=0,"",C4/F4)'],['0','0',EUR,EUR,EUR,EUR,EUR,PCT,ROASF])
    benef_cf(ws,'G4:G4')
    header(ws,COLS,FIRST-1)
    rows=DATA.get((y,m),[])
    for k in range(NROWS):
        r=FIRST+k; fill=BLUEF if k%2==0 else WHITE
        vals=list(rows[k]) if k<len(rows) else [None]*7
        for ci,v in zip([1,2,3,4,6,7,10],vals):
            c=ws.cell(row=r,column=ci,value=v if v!='' else None)
        ws.cell(row=r,column=5,value=f'=IF(B{r}="","",IF(N(C{r})=0,0,ROUND(N(D{r})*0.015+0.25*C{r},2)))')
        ws.cell(row=r,column=8,value=f'=IF(B{r}="","",N(D{r})-N(E{r})-N(F{r})-N(G{r}))')
        ws.cell(row=r,column=9,value=f'=IF(OR(B{r}="",N(G{r})=0),"",N(D{r})/N(G{r}))')
        for ci in range(1,11):
            c=ws.cell(row=r,column=ci); c.fill=fill; c.border=B
            calc=ci in (5,8,9)
            c.font=Font(name=F,bold=(ci==8),color='000000' if calc else '0000FF',size=10)
            c.alignment=Alignment(horizontal='left' if ci in (2,10) else 'center',vertical='center',wrap_text=(ci==10))
            if ci==1: c.number_format=DATE
            elif ci in (4,5,6,7,8): c.number_format=EUR
            elif ci==9: c.number_format=ROASF
    benef_cf(ws,f'H{FIRST}:H{LAST}')
    for j,t in enumerate(['Escribe en azul. Lo negro se calcula solo.',
        '«Impuesto Shopify» = 1,5 % del importe + 0,25 € por pedido (comisión de Shopify Payments, tarjeta europea).',
        '«Beneficio neto» = Ingresos − Impuesto Shopify − Coste proveedor − Meta Ads.',
        '«ROAS» = Ingresos ÷ Meta Ads (cuántos euros de venta trae cada euro de anuncios). Sale vacío si no hay gasto en Meta.',
        'Si falta el coste del proveedor, el beneficio sale más alto de lo real: apúntalo en «Notas».']):
        ws.cell(row=LAST+2+j,column=1,value=t).font=Font(name=F,italic=True,size=9,color='666666')
    ws.freeze_panes=f'A{FIRST}'

# RESUMEN
for i,w in enumerate([16,12,12,16,16,16,14,16,11,11],1): res.column_dimensions[chr(64+i)].width=w
title(res,'OELNOR · CONTROL SIMPLE · RESUMEN',10)
T0=6; T1=T0+len(names)-1
kpis(res,['Total tests','Total pedidos','Ingresos','Impuesto Shopify','Proveedor','Meta Ads','Beneficio neto','Margen','ROAS total'],
     [f'=SUM(B{T0}:B{T1})',f'=SUM(C{T0}:C{T1})',f'=SUM(D{T0}:D{T1})',f'=SUM(E{T0}:E{T1})',f'=SUM(F{T0}:F{T1})',f'=SUM(G{T0}:G{T1})','=C4-D4-E4-F4','=IF(C4=0,"",G4/C4)','=IF(F4=0,"",C4/F4)'],
     ['0','0',EUR,EUR,EUR,EUR,EUR,PCT,ROASF])
benef_cf(res,'G4:G4')
header(res,['Mes','Tests','Pedidos','Ingresos (€)','Impuesto Shopify (€)','Proveedor (€)','Meta Ads (€)','Beneficio neto (€)','Margen','ROAS'],T0-1)
for k,nm in enumerate(names):
    r=T0+k; q=f"'{nm}'!"
    vals=[nm,f'={q}A4',f'={q}B4',f'={q}C4',f'={q}D4',f'={q}E4',f'={q}F4',f'={q}G4',f'=IF(D{r}=0,"",H{r}/D{r})',f'=IF(N(G{r})=0,"",D{r}/G{r})']
    for ci,v in enumerate(vals,1):
        c=res.cell(row=r,column=ci,value=v); c.fill=BLUEF if k%2==0 else WHITE; c.border=B
        c.font=Font(name=F,bold=(ci in (1,8)),size=10); c.alignment=Alignment(horizontal='left' if ci==1 else 'center')
        c.number_format=EUR if ci in (4,5,6,7,8) else PCT if ci==9 else ROASF if ci==10 else '0'
    res.cell(row=r,column=1).hyperlink=f"#'{nm}'!A1"
benef_cf(res,f'H{T0}:H{T1}')
res.cell(row=T1+2,column=1,value='Haz clic en el mes para ir a su pestaña. Cada mes se rellena en su propia pestaña; este resumen se actualiza solo.').font=Font(name=F,italic=True,size=9,color='666666')
res.freeze_panes='A6'

for w in wb.worksheets:
    w.page_setup.orientation='landscape'; w.page_setup.fitToWidth=1; w.page_setup.fitToHeight=0; w.sheet_properties.pageSetUpPr.fitToPage=True
wb.save(OUT); print('ok')
