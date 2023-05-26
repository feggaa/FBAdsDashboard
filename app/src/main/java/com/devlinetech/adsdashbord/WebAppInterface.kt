package com.devlinetech.adsdashbord

import android.annotation.SuppressLint
import android.content.ContentValues
import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import com.google.gson.Gson
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import java.io.IOException
import java.net.URL
import java.nio.ByteBuffer
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class WebAppInterface(private val mContext: MainActivity,webView: WebView, dbManager: DbManager) {
    lateinit var dbManager : DbManager
    lateinit var webView : WebView
    init {
        this.dbManager = dbManager
        this.webView = webView
    }

    @JavascriptInterface
    fun Toast(toast: String): String {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
        return "From Kotlin"
    }

    fun AddToClintesList(ID : Int, Name : String,LastPay : String,LastAmount : String,Contact : String,Credit : String){
        webView.post {
            webView.evaluateJavascript("AddToClintesList('$ID','$Name','$LastPay','$LastAmount','$Contact','$Credit');", null)
            //webView.loadUrl(Uri.fromFile(File(Icon)).toString())
        }
    }
    fun AddToPagesList(id : Int,name : String,link : String,logo : String,like : String,admin : String,adminID : String){
        webView.post {
            webView.evaluateJavascript("AddToPagesList('$id','$name','$link','$logo','$like','$admin','$adminID');", null)
        }
    }
    fun AddToPaymentsList(id : Int, amount : String,clinteID : String,admin : String,date : String,time : String){
        webView.post {
            webView.evaluateJavascript("AddToPaymentsList('$id','$amount','$clinteID','$admin','$date','$time');", null)
        }
    }
    fun AddToBoostList(id : Int, page : String,Doller : String,dinar : String,date : String,Time : String,State : String){
        webView.post {
            webView.evaluateJavascript("AddToBoostList('$id','$page','$Doller','$dinar','$date','$Time','$State');", null)
        }
    }
    @JavascriptInterface
    fun AddToBoostToListClinte(id : Int, Start : String,end : String,amount : String){
        webView.post {
            webView.evaluateJavascript("AddToBoostToListClinte('$id','$Start','$end','$amount');", null)
        }
    }
    @JavascriptInterface
    fun AddToPageToListClinte(PageID : String,PageName : String,srcImag : String){
        webView.post {
            webView.evaluateJavascript("AddToPageToListClinte('$PageID','$PageName','$srcImag');", null)
        }
    }

    @SuppressLint("NewApi")
    @JavascriptInterface
    fun SaveNewBoost(ClinteID : String,PageID : String,Budget : String,DateEnd : String,Doller : String,Page : String) : Long{
        val date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))
        val valContent = ContentValues()
        valContent.put("AdminID", ClinteID)
        valContent.put("PageID", PageID)
        valContent.put("Date", date)
        valContent.put("Time", time)
        valContent.put("End", DateEnd)
        valContent.put("Budget", Budget)
        valContent.put("Doller", Doller)
        valContent.put("State", "")
        var eID = dbManager.insert(valContent,"Boost")
        if (eID > 0)
        {
            AddToBoostList(eID.toInt(),Page,Doller,Budget,date,time,"")
        }
        return eID
    }
    @SuppressLint("Range")
    @JavascriptInterface
    fun LoadActivities(){
        val dbManager = DbManager(mContext)

        try {
            //val cursor = dbManager.SQL("SELECT * FROM BL;")
            val cursor = dbManager.SQL("SELECT Boost.ID,Boost.Doller,Boost.Budget,Boost.Date,Boost.Time,Boost.AdminID,Pages.pName \n" +
                    "FROM Boost\n" +
                    "INNER JOIN Pages ON Boost.AdminID = Pages.ID ORDER BY Boost.ID DESC")
            if (cursor!!.count == 0) return
            cursor!!.moveToFirst()
            do{
                var ID = cursor.getInt(cursor.getColumnIndex("ID"))
                var Doller = cursor.getString(cursor.getColumnIndex("Doller"))
                var Date = cursor.getString(cursor.getColumnIndex("Date"))
                var Time = cursor.getString(cursor.getColumnIndex("Time"))
                var AdminID = cursor.getString(cursor.getColumnIndex("AdminID"))
                var pName = cursor.getString(cursor.getColumnIndex("pName"))
                var Dinar = cursor.getString(cursor.getColumnIndex("Budget"))

                AddToBoostList(ID,pName,Doller,Dinar,Date,Time,"")

            }while (cursor.moveToNext())
            //if (cursor.count == 1) ShowPanel(ID)
            cursor.close()
        }catch (EX: Exception){
            println("=========================> Error -> $EX")
        }
    }

    @SuppressLint("NewApi")
    @JavascriptInterface
    fun SaveNewPayament(ClinteID : String,Amount : String,admin : String) : Long{
        val date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))
        val valContent = ContentValues()
        valContent.put("AdminID", ClinteID)
        valContent.put("Amount", Amount)
        valContent.put("Date", date)
        valContent.put("Time", time)
        var eID = dbManager.insert(valContent,"Payments")
        if (eID > 0)
        {
            AddToPaymentsList(eID.toInt(),Amount,ClinteID,admin,date,time)
        }
        return eID
    }

    @SuppressLint("Range")
    @JavascriptInterface
    fun LoadPayments(){
        val dbManager = DbManager(mContext)

        try {
            //val cursor = dbManager.SQL("SELECT * FROM BL;")
            val cursor = dbManager.SQL("SELECT Payments.ID,Payments.Amount,Payments.Date,Payments.Time,Payments.AdminID,Clintes.cName \n" +
                    "FROM Payments\n" +
                    "INNER JOIN Clintes ON Payments.AdminID = Clintes.ID")
            if (cursor!!.count == 0) return
            cursor!!.moveToFirst()
            do{
                var ID = cursor.getInt(cursor.getColumnIndex("ID"))
                var Amount = cursor.getString(cursor.getColumnIndex("Amount"))
                var Date = cursor.getString(cursor.getColumnIndex("Date"))
                var Time = cursor.getString(cursor.getColumnIndex("Time"))
                var AdminID = cursor.getString(cursor.getColumnIndex("AdminID"))
                var cName = cursor.getString(cursor.getColumnIndex("cName"))

                AddToPaymentsList(ID,Amount,AdminID,cName,Date,Time)

            }while (cursor.moveToNext())
            //if (cursor.count == 1) ShowPanel(ID)
            cursor.close()
        }catch (EX: Exception){
            println("=========================> Error -> $EX")
        }
    }

    @JavascriptInterface
    fun LoadPageInfo(PageLink : String){
        println("Load Page : $PageLink")
        getHtmlFromWeb(PageLink)
    }

    @JavascriptInterface
    fun SaveNewPage(PageName : String,PageLink: String,PageLogo : String,Admin : String,AdminID : String) : Long{
// "CREATE TABLE 'Pages' ('Name' TEXT,'Link' TEXT,'Likes' TEXT,'AdminID' INTEGER,'Logo' TEXT)
        val valContent = ContentValues()
        valContent.put("pName", PageName)
        valContent.put("Link", PageLink)
        valContent.put("Logo", PageLogo)
        valContent.put("AdminID", AdminID.toInt())
        valContent.put("Likes", 0)
        var eID = dbManager.insert(valContent,"Pages")
        if (eID > 0)
        {
            AddToPagesList(eID.toInt(),PageName,PageLink,PageLogo,"0",Admin,AdminID)
        }
        return eID
    }

    @SuppressLint("Range")
    @JavascriptInterface
    fun LoadPages(){
        val dbManager = DbManager(mContext)

        try {
            //val cursor = dbManager.SQL("SELECT * FROM BL;")
            val cursor = dbManager.SQL("SELECT Pages.ID,Pages.pName,Pages.Link,Pages.Logo,Pages.Likes,Pages.AdminID,Clintes.cName \n" +
                    "FROM Pages\n" +
                    "INNER JOIN Clintes ON Pages.AdminID = Clintes.ID")
            if (cursor!!.count == 0) return
            cursor!!.moveToFirst()
            do{
                var ID = cursor.getInt(cursor.getColumnIndex("ID"))
                var pName = cursor.getString(cursor.getColumnIndex("pName"))
                var cName = cursor.getString(cursor.getColumnIndex("cName"))
                var Link = cursor.getString(cursor.getColumnIndex("Link"))
                var Logo = cursor.getString(cursor.getColumnIndex("Logo"))
                var Likes = cursor.getInt(cursor.getColumnIndex("Likes"))
                var AdminID = cursor.getInt(cursor.getColumnIndex("AdminID"))
                //println("=========================> $ID -> $Name -> $Mac -> $IP")
                //AddToHomeList(ID,Name,Mac,IP,"#fff402") // #e74949
                AddToPagesList(ID,pName,Link,Logo,Likes.toString(),cName,AdminID.toString())

            }while (cursor.moveToNext())
            //if (cursor.count == 1) ShowPanel(ID)
            cursor.close()
        }catch (EX: Exception){
            println("=========================> Error -> $EX")
        }
    }

    @SuppressLint("Range")
    @JavascriptInterface
    fun LoadClintes(searchClinte : String = ""){
        val dbManager = DbManager(mContext)

        try {
            //val cursor = dbManager.SQL("SELECT * FROM BL;")
            val cursor = dbManager.SQL("SELECT * FROM Clintes WHERE cName Like '%$searchClinte%';")


            //val cursor = dbManager.SQL("SELECT Clintes.ID,Clintes.cName,Clintes.Phone,Clintes.Address,Clintes.Credit,Clintes.Contact \n" +
              //      "FROM Payments\n" +
                //    "INNER JOIN Payments ON Payments.AdminID = Clintes.ID")
            if (cursor!!.count == 0) return
            cursor!!.moveToFirst()
            do{
                var ID = cursor.getInt(cursor.getColumnIndex("ID"))
                var Name = cursor.getString(cursor.getColumnIndex("cName"))
                var Phone = cursor.getString(cursor.getColumnIndex("Phone"))
                var Address = cursor.getString(cursor.getColumnIndex("Address"))
                var Contact = cursor.getString(cursor.getColumnIndex("Contact"))
                var Credit = cursor.getString(cursor.getColumnIndex("Credit"))
                //println("=========================> $ID -> $Name -> $Mac -> $IP")
                //AddToHomeList(ID,Name,Mac,IP,"#fff402") // #e74949
                AddToClintesList(ID,Name,"2022/12/08","1500",Contact,Credit)
                //DeviceList.put(ID,DevOnline(IP,Mac,false, TCPClinte(mContext,IP)))

            }while (cursor.moveToNext())
            //if (cursor.count == 1) ShowPanel(ID)
            cursor.close()
        }catch (EX: Exception){
            println("=========================> Error -> $EX")
        }
    }

    @JavascriptInterface
    fun SaveNewClinte(Clinte : String,Phone : String,Address : String,Contact : String) : Long{

        val valContent = ContentValues()
        valContent.put("cName", Clinte)
        valContent.put("Phone", Phone)
        valContent.put("Address", Address)
        valContent.put("Contact", Contact)
        valContent.put("Credit", 0)
        valContent.put("img", "")
        var eID = dbManager.insert(valContent,"Clintes")
        if (eID > 0)
        {
            AddToClintesList(eID.toInt(),Clinte,"","",Contact,"0")
        }
        return eID
    }
    private fun getHtmlFromWeb(PageLink : String) {
        var pageTilte = ""
        Thread(Runnable {
            val stringBuilder = StringBuilder()
            try {
                val doc: Document = Jsoup.connect(PageLink).get()
                // val doc: Document = Jsoup.connect("https://laidfeggaa.com").get()
                val metaTags = doc.getElementsByTag("meta")
                for (meta in metaTags){
                    if ( meta.attr("property") == "og:title"){
                        pageTilte = meta.attr("content")
                        webView.post {
                            webView.evaluateJavascript("$('#addPage-Name').val('$pageTilte');$('#spinnerNamePage').hide();", null)
                            //webView.loadUrl(Uri.fromFile(File(Icon)).toString())
                        }

                    }
                    if ( meta.attr("property") == "og:image"){
                        val ImageLink = meta.attr("content")
                        val strFile = ImageLink.split("?")[0]
                        var strFileName = strFile.substring(strFile.lastIndexOf("/") + 1)
                        downloadFile(ImageLink,strFileName+".jpg")

                        var PathImage = mContext.filesDir.toString()+"/"+strFileName+".jpg"
                        webView.post {
                            webView.evaluateJavascript("$('#Page-Logo').attr('src','$PathImage');$('#spinnerLogoPage').hide();", null)
                            //webView.loadUrl(Uri.fromFile(File(Icon)).toString())
                        }


                    }

                }
            } catch (e: IOException) {
                stringBuilder.append("Error : ").append(e.message).append("\n")
            }
        }).start()
    }

    private fun downloadFile(strFileURL: String,SaveTo : String = "") : Int{
        var FileSize = 0
        val strFile = strFileURL.split("?")[0]
        var strFileName = strFile.substring(strFile.lastIndexOf("/") + 1)
        if (SaveTo != "") strFileName = SaveTo
        println("Saving: $strFileName, from: $strFileURL")
        try {
            val urlFile = URL(strFileURL)
            val inFile = urlFile.openStream()
            val buffer = ByteArray(4096)
            val hFile = mContext.openFileOutput(strFileName, Context.MODE_PRIVATE)
            val dest = hFile.channel

            while (true) {
                val ret = inFile.read(buffer)
                if (ret == -1 ) break
                FileSize += ret
                dest.write(ByteBuffer.wrap(buffer,0,ret))
            }
            hFile.close()
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return FileSize
    }
}